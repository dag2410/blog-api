const usersService = require("../service/user.service");

exports.getList = async (req, res) => {
  const users = await usersService.getAll();
  res.json(users);
};

exports.getOne = async (req, res) => {
  const user = await usersService.getById(req.params.id);
  res.json(user);
};

exports.create = async (req, res) => {
  const user = await usersService.create(req.body);
  res.json(user);
};

exports.update = async (req, res) => {
  const user = await usersService.update(req.params.id, req.body);
  res.json(user);
};

exports.remove = async (req, res) => {
  await usersService.remove(req.params.id);
  return res.status(204).send();
};
