const { Follow, User } = require("@/models");

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
      return "Bỏ theo dỗi";
    } else {
      await Follow.create({ following_id, followed_id });
      await User.increment("following_count", {
        where: { id: following_id },
      });

      await User.increment("followers_count", {
        where: { id: followed_id },
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
