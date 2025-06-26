const { logger } = require("sequelize/lib/utils/logger");
const commentsService = require("../service/comment.service");

exports.getList = async (req, res) => {
  const comments = await commentsService.getAll();
  res.json(comments);
};

exports.getOne = async (req, res) => {
  const comment = await commentsService.getById(req.params.id);
  res.json(comment);
};

exports.create = async (req, res) => {
  const comment = await commentsService.create(req.body);
  res.json(comment);
};

exports.update = async (req, res) => {
  const comment = await commentsService.update(req.params.id, req.body);
  res.json(comment);
};

exports.remove = async (req, res) => {
  await commentsService.remove(req.params.id);
  return res.status(204).send();
};
