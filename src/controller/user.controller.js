const usersService = require("@/service/user.service");
const { success } = require("@/utils/response");

exports.getList = async (req, res) => {
  const users = await usersService.getAll();
  success(res, 200, users);
};

exports.getOne = async (req, res) => {
  success(res, 200, req.user);
};

exports.create = async (req, res) => {
  const user = await usersService.create(req.body);
  success(res, 201, user);
};

exports.update = async (req, res) => {
  const user = await usersService.update(req.user.id, req.body);
  success(res, 200, user);
};

exports.remove = async (req, res) => {
  await usersService.remove(req.user.id);
  success(res, 200);
};
