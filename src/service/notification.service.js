const { Notification, User, sequelize } = require("@/models");
const { Sequelize } = require("sequelize");

class NotificationService {
  async getAll(user_id) {
    return await Notification.findAll({
      include: [
        {
          model: User,
          as: "actor",
          attributes: ["id", "username", "avatar"],
        },
        {
          model: User,
          as: "receivers",
          where: { id: user_id },
          attributes: ["id"],
          through: { attributes: ["read_at"] },
        },
      ],
      order: [["createdAt", "DESC"]],
    });
  }

  async create(receiver_id, data) {
    const { receiver_id: _, ...notificationData } = data;

    const notification = await Notification.create(notificationData);
    await notification.addReceiver(receiver_id);
    return notification;
  }

  async delete({
    actor_id,
    receiver_id,
    notifiable_type,
    notifiable_id,
    type,
  }) {
    const notification = await Notification.findOne({
      where: {
        actor_id,
        notifiable_type,
        notifiable_id,
        type,
      },
      include: [
        {
          model: User,
          as: "receivers",
          where: { id: receiver_id },
          attributes: [],
        },
      ],
    });

    if (!notification) return { message: "No notification found" };

    await notification.removeReceiver(receiver_id);
    return { message: "Notification deleted", id: notification.id };
  }

  async markAsRead(user_id, notification_id) {
    const notification = await Notification.findByPk(notification_id, {
      include: [
        {
          model: User,
          as: "receivers",
          where: { id: user_id },
          through: { attributes: ["read_at"] },
        },
      ],
    });

    if (!notification) {
      throw new Error("Notification not found for this user");
    }

    await sequelize.query(
      `UPDATE user_notification 
   SET read_at = :readAt
   WHERE user_id = :userId AND notification_id = :notificationId`,
      {
        replacements: {
          readAt: new Date(),
          userId: user_id,
          notificationId: notification_id,
        },
        type: sequelize.QueryTypes.UPDATE,
      }
    );
    return {
      message: "Notification marked as read",
      id: notification_id,
      user_id: user_id,
    };
  }

  async markAllAsRead(user_id) {
    await sequelize.query(
      `UPDATE user_notification
     SET read_at = :readAt
     WHERE user_id = :userId AND read_at IS NULL`,
      {
        replacements: {
          readAt: new Date(),
          userId: user_id,
        },
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    return { message: "All notifications marked as read" };
  }
}

module.exports = new NotificationService();
