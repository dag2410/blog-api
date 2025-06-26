const { Topic, Post } = require("../models");

class TopicsService {
  async getAll() {
    const topics = await Topic.findAll();
    return topics;
  }

  async getById(id) {
    const topic = await Topic.findByPk(id, {
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
    const topic = await Topic.create(data);
    return topic;
  }

  async update(id, data) {
    const topic = await Topic.findByPk(id);
    if (!topic) return null;
    await topic.update(data);
    return topic;
  }

  async remove(id) {
    const topic = await Topic.findByPk(id);
    if (!topic) return null;
    await topic.destroy();
    return topic;
  }
}

module.exports = new TopicsService();
