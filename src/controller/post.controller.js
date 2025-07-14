const postsService = require("@/service/post.service");
const { success } = require("@/utils/response");

exports.getList = async (req, res) => {
  const posts = await postsService.getAll();
  success(res, 200, posts);
};

exports.getOne = async (req, res) => {
  success(res, 200, req.post);
};

exports.create = async (req, res) => {
  const post = await postsService.create(req.body);
  success(res, 201, post);
};

exports.update = async (req, res) => {
  const post = await postsService.update(req.post.id, req.body);
  success(res, 200, post);
};

exports.remove = async (req, res) => {
  await postsService.remove(req.post.id);
  success(res, 200);
};
