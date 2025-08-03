const { Post, Comment, Topic, User, Tag, Like, Bookmark } = require("@/models");
const { Op } = require("sequelize");

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
            "post_count",
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
    const post = await Post.create(data);
    return post;
  }

  async update(slug, data) {
    const post = await Post.findByPk(slug);
    if (!post) return null;
    await post.update(data);
    return post;
  }

  async remove(slug) {
    const post = await Post.findByPk(slug);
    if (!post) return null;
    await post.destroy();
    return post;
  }

  async getByUserId(userId, page = 1, limit = 10, currentUserId = null) {
    const offset = (page - 1) * limit;

    const { rows: items, count: total } = await Post.findAndCountAll({
      where: { user_id: userId },
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

    return { items, total };
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
