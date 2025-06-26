const postsService = require("../service/post.service");

exports.getList = async (req, res) => {
  const posts = await postsService.getAll();
  res.json(posts);
};

exports.getOne = async (req, res) => {
  const post = await postsService.getById(req.params.id);
  res.json(post);
};

exports.create = async (req, res) => {
  const post = await postsService.create(req.body);
  res.json(post);
};

exports.update = async (req, res) => {
  const post = await postsService.update(req.params.id, req.body);
  res.json(post);
};

exports.remove = async (req, res) => {
  await postsService.remove(req.params.id);
  return res.status(204).send();
};
