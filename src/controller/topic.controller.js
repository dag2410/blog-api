const topicsService = require("@/service/topic.service");
const { success } = require("@/utils/response");

exports.getList = async (req, res) => {
  const topics = await topicsService.getAll();
  success(res, 200, topics);
};

exports.getOne = async (req, res) => {
  success(res, 200, req.topic);
};

exports.create = async (req, res) => {
  const topic = await topicsService.create(req.body);
  success(res, 201, topic);
};

exports.update = async (req, res) => {
  const topic = await topicsService.update(req.topic.slug, req.body);
  success(res, 200, topic);
};

exports.remove = async (req, res) => {
  await topicsService.remove(req.topic.slug);
  success(res, 200);
};
exports.getTrendingTopics = async (req, res) => {
  const trendingTopics = await topicsService.getTrendingTopics();
  success(res, 200, trendingTopics);
};
