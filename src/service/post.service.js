const {
  Post,
  Comment,
  Topic,
  User,
  Tag,
  Like,
  Bookmark,
  sequelize,
} = require("@/models");
const generateUniqueSlug = require("@/utils/generateUniqueSlug");
const { Op, Sequelize, where } = require("sequelize");

class PostsService {
  async getAll(page = 1, limit = 10, topicSlug = null, currentUserId = null) {
    const offset = (page - 1) * limit;
    const include = [
      {
        model: User,
        as: "users",
        attributes: ["id", "username", "email", "avatar"],
      },
      {
        model: Like,
        as: "likes",
        attributes: ["id", "user_id"],
        where: currentUserId ? { user_id: currentUserId } : undefined,
        required: false,
      },
      {
        model: Bookmark,
        as: "bookmarks",
        attributes: ["id", "user_id"],
        where: currentUserId ? { user_id: currentUserId } : undefined,
        required: false,
      },
    ];

    if (topicSlug) {
      include.push({
        model: Topic,
        as: "topics",
        where: { slug: topicSlug },
        through: { attributes: [] },
      });
    }

    const { rows: items, count: total } = await Post.findAndCountAll({
      include,
      limit,
      offset,
      distinct: true,
    });

    return { items, total };
  }

  async getBySlug(slug, currentUserId = null) {
    const post = await Post.findOne({
      where: { slug },
      include: [
        {
          model: Topic,
          as: "topics",
        },
        {
          model: Comment,
          as: "comments",
        },
        {
          model: User,
          as: "users",
          attributes: [
            "id",
            "username",
            "avatar",
            "title",
            "posts_count",
            "followers_count",
            "following_count",
            "about",
            "github_url",
            "linkedin_url",
            "website_url",
          ],
        },
        {
          model: Tag,
          as: "tags",
        },
        {
          model: Like,
          as: "likes",
          attributes: ["id", "user_id"],
          where: currentUserId ? { user_id: currentUserId } : undefined,
          required: false,
        },
        {
          model: Bookmark,
          as: "bookmarks",
          attributes: ["id", "user_id"],
          where: currentUserId ? { user_id: currentUserId } : undefined,
          required: false,
        },
      ],
    });
    return post;
  }

  async create(data) {
    const { topics, ...postData } = data;

    const transaction = await sequelize.transaction();
    try {
      const post = await Post.create(postData, { transaction });

      if (topics && Array.isArray(topics) && topics.length > 0) {
        const topicIds = [];
        for (const topicName of topics) {
          if (!topicName || typeof topicName !== "string") {
            continue;
          }

          let topic = await Topic.findOne({
            where: { name: topicName },
            transaction,
          });

          if (!topic) {
            topic = await Topic.create(
              {
                name: String(topicName),
                slug: await generateUniqueSlug(topicName),
                title: topicName,
                posts_count: 0,
              },
              { transaction }
            );
          }

          topicIds.push(topic.id);
        }

        if (topicIds.length > 0) {
          await post.setTopics(topicIds, { transaction });

          await Topic.update(
            { posts_count: Sequelize.literal("posts_count + 1") },
            {
              where: { id: { [Sequelize.Op.in]: topicIds } },
              transaction,
            }
          );
        }
      }
      await User.increment("posts_count", {
        by: 1,
        where: { id: post.user_id },
        transaction,
      });

      await transaction.commit();

      const postWithTopics = await Post.findByPk(post.id, {
        include: [{ model: Topic, as: "topics" }],
      });

      return postWithTopics;
    } catch (error) {
      await transaction.rollback();
      throw new Error(`Lỗi khi tạo post: ${error.message}`);
    }
  }

  async update(slug, data) {
    const post = await Post.findOne({ where: { slug } });
    if (!post) return null;

    const { topics, ...postData } = data;
    await post.update(postData);

    if (topics?.length) {
      const topicInstances = await Promise.all(
        topics.map(async (name) => {
          const topicSlug = await generateUniqueSlug(name);
          const [topic] = await Topic.findOrCreate({
            where: { name },
            defaults: {
              name,
              slug: topicSlug,
              title: name,
              posts_count: 0,
            },
          });
          return topic;
        })
      );
      await post.setTopics(topicInstances);
    }

    return post;
  }

  async remove(slug) {
    const post = await Post.findByPk(slug);
    if (!post) return null;
    await post.destroy();
    return post;
  }

  async getByUserId(
    userId,
    page = 1,
    limit = 10,
    currentUserId = null,
    status = "all",
    search = ""
  ) {
    const offset = (page - 1) * limit;

    const where = { user_id: userId };

    if (status !== "all") {
      where.status = status;
    }

    if (search) {
      where.title = { [Op.substring]: search };
    }

    const { rows: items, count: total } = await Post.findAndCountAll({
      order: [["published_at", "DESC"]],
      where,
      include: [
        {
          model: Topic,
          as: "topics",
          through: { attributes: [] },
        },
        {
          model: User,
          as: "users",
          attributes: ["id", "username", "email", "avatar"],
        },
        {
          model: Like,
          as: "likes",
          attributes: ["id", "user_id"],
          where: currentUserId ? { user_id: currentUserId } : undefined,
          required: false,
        },
        {
          model: Bookmark,
          as: "bookmarks",
          attributes: ["id", "user_id"],
          where: currentUserId ? { user_id: currentUserId } : undefined,
          required: false,
        },
      ],
      limit,
      offset,
      distinct: true,
    });

    const counts = await Post.findAll({
      where: { user_id: userId },
      attributes: [
        "status",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      group: ["status"],
    });

    const countMap = counts.reduce((acc, row) => {
      acc[row.status] = parseInt(row.dataValues.count);
      return acc;
    }, {});
    countMap.all = Object.values(countMap).reduce((a, b) => a + b, 0);

    return { items, total, counts: countMap };
  }

  async getFeatured(limit = 3, currentUserId = null) {
    const posts = await Post.findAll({
      order: [["views_count", "DESC"]],
      limit,
      include: [
        {
          model: User,
          as: "users",
          attributes: ["id", "username", "avatar"],
        },
        {
          model: Topic,
          as: "topics",
          through: { attributes: [] },
        },
        {
          model: Like,
          as: "likes",
          attributes: ["id", "user_id"],
          where: currentUserId ? { user_id: currentUserId } : undefined,
          required: false,
        },
        {
          model: Bookmark,
          as: "bookmarks",
          attributes: ["id", "user_id"],
          where: currentUserId ? { user_id: currentUserId } : undefined,
          required: false,
        },
      ],
    });

    return posts;
  }

  async getRecent(limit = 6, currentUserId = null) {
    const posts = await Post.findAll({
      order: [["published_at", "DESC"]],
      limit,
      include: [
        {
          model: User,
          as: "users",
          attributes: ["id", "username", "avatar"],
        },
        {
          model: Topic,
          as: "topics",
          through: { attributes: [] },
        },
        {
          model: Like,
          as: "likes",
          attributes: ["id", "user_id"],
          where: currentUserId ? { user_id: currentUserId } : undefined,
          required: false,
        },
        {
          model: Bookmark,
          as: "bookmarks",
          attributes: ["id", "user_id"],
          where: currentUserId ? { user_id: currentUserId } : undefined,
          required: false,
        },
      ],
    });

    return posts;
  }

  async getRelated(topic_id, excludeSlug, limit = 3, currentUserId = null) {
    const posts = await Post.findAll({
      where: {
        slug: {
          [Op.ne]: excludeSlug,
        },
      },
      limit,
      include: [
        {
          model: User,
          as: "users",
          attributes: ["id", "username", "avatar"],
        },
        {
          model: Topic,
          as: "topics",
          where: {
            id: topic_id,
          },
          through: { attributes: [] },
        },
        {
          model: Like,
          as: "likes",
          attributes: ["id", "user_id"],
          where: currentUserId ? { user_id: currentUserId } : undefined,
          required: false,
        },
        {
          model: Bookmark,
          as: "bookmarks",
          attributes: ["id", "user_id"],
          where: currentUserId ? { user_id: currentUserId } : undefined,
          required: false,
        },
      ],
    });

    return posts;
  }
}

module.exports = new PostsService();
