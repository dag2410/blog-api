const { Follow, User } = require("@/models");
const notificationService = require("./notification.service");
const pusher = require("@/config/pusher");

class FollowService {
  async toggleFollow({ following_id, followed_id }) {
    const existing = await Follow.findOne({
      where: { following_id, followed_id },
    });

    if (existing) {
      await existing.destroy();
      await User.decrement("following_count", {
        where: { id: following_id },
      });
      await User.decrement("followers_count", {
        where: { id: followed_id },
      });

      await notificationService.delete({
        actor_id: following_id,
        receiver_id: followed_id,
        notifiable_type: "User",
        notifiable_id: following_id,
        type: "follow",
      });

      pusher.trigger(`user-${followed_id}`, "new-notification", {
        action: "unfollowed",
        actor_id: following_id,
      });

      return "Bỏ theo dỗi";
    } else {
      await Follow.create({ following_id, followed_id });
      await User.increment("following_count", {
        where: { id: following_id },
      });
      await User.increment("followers_count", {
        where: { id: followed_id },
      });

      await notificationService.create(followed_id, {
        type: "follow",
        title: ` started following you`,
        notifiable_type: "User",
        notifiable_id: following_id,
        actor_id: following_id,
      });

      pusher.trigger(`user-${followed_id}`, "new-notification", {
        action: "followed",
        actor_id: following_id,
      });

      return "Theo dỗi thành công";
    }
  }

  async getFollowing(userId) {
    const followings = await Follow.findAll({
      where: { following_id: userId },
      include: [
        {
          model: User,
          as: "followed",
          attributes: ["id", "username", "avatar"],
        },
      ],
    });
    return followings.map((f) => f.followed);
  }

  async getFollowers(userId) {
    const followers = await Follow.findAll({
      where: { followed_id: userId },
      include: [
        {
          model: User,
          as: "follower",
          attributes: ["id", "username", "avatar"],
        },
      ],
    });
    return followers.map((f) => f.follower);
  }
}

module.exports = new FollowService();
