const { Topic, Post } = require("@/models");
const generateUniqueSlug = require("@/utils/generateUniqueSlug");
const { where, Op } = require("sequelize");

class TopicsService {
  async getAll() {
    const topics = await Topic.findAll();
    return topics;
  }

  async getBySlug(value) {
    const topic = await Topic.findOne({
      where: {
        slug: value,
      },
      include: [
        {
          model: Post,
          as: "posts",
        },
      ],
    });
    return topic;
  }

  async create(data) {
    const slug = await generateUniqueSlug(data.title);
    const topic = await Topic.create({ ...data, slug });
    return topic;
  }

  async update(slug, data) {
    const topic = await Topic.findOne({ where: slug });
    if (!topic) return null;
    await topic.update(data);
    return topic;
  }

  async remove(slug) {
    const topic = await Topic.findOne({ where: slug });
    if (!topic) return null;
    await topic.destroy();
    return topic;
  }

  async getTrendingTopics(limit = 3) {
    const topics = await Topic.findAll({
      order: [["posts_count", "DESC"]],
      limit,
    });
    return topics;
  }
}

module.exports = new TopicsService();
