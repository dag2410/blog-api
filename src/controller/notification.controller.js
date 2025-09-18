const notificationService = require("@/service/notification.service");
const { success } = require("@/utils/response");

exports.getAll = async (req, res) => {
  const user_id = req.user.id;
  const result = await notificationService.getAll(user_id);
  success(res, 200, result);
};

exports.create = async (req, res) => {
  const actor_id = req.user.id;
  const { type, title, notifiable_type, notifiable_id, receiver_id } = req.body;

  const result = await notificationService.create(receiver_id, {
    type,
    title,
    notifiable_type,
    notifiable_id,
    actor_id,
  });

  success(res, 201, result);
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  const result = await notificationService.delete(user_id, id);
  success(res, 200, result);
};

exports.markAsRead = async (req, res) => {
  const { id } = req.body;
  const user_id = req.user.id;

  const result = await notificationService.markAsRead(user_id, id);
  success(res, 200, result);
};

exports.markAllAsRead = async (req, res) => {
  const user_id = req.user.id;
  const result = await notificationService.markAllAsRead(user_id);
  success(res, 200, result);
};
