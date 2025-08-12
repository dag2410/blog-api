const followService = require("@/service/follow.service");
const { success } = require("@/utils/response");

exports.toggleFollow = async (req, res) => {
  try {
    const following_id = req.user.id;
    const { followed_id } = req.body;

    if (!followed_id) {
      return res.status(400).json({ message: "Missing followed_id" });
    }

    const result = await followService.toggleFollow({
      following_id,
      followed_id,
    });

    success(res, 200, result);
  } catch (error) {
    console.error("Error toggling follow:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getFollowing = async (req, res) => {
  try {
    const userId = req.params.userId;
    const following = await followService.getFollowing(userId);
    success(res, 200, following);
  } catch (error) {
    console.error("Error getting following:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getFollowers = async (req, res) => {
  try {
    const userId = req.params.userId;
    const followers = await followService.getFollowers(userId);
    success(res, 200, followers);
  } catch (error) {
    console.error("Error getting followers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
