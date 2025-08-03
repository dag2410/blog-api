const { Like, Post, Comment } = require("@/models");
const messageModel = require("@/models/message.model");

class LikeService {
  async toggleLike({ user_id, likeable_type, likeable_id }) {
    const existingLike = await Like.findOne({
      where: { user_id, likeable_type, likeable_id },
    });

    if (existingLike) {
      await existingLike.destroy();

      if (likeable_type === "Post") {
        await Post.decrement("likes_count", { where: { id: likeable_id } });
      } else if (likeable_type === "Comment") {
        await Comment.decrement("likes_count", { where: { id: likeable_id } });
      }

      return {
        action: "unliked",
        likeable_type,
        likeable_id,
      };
    } else {
      await Like.create({
        user_id,
        likeable_type,
        likeable_id,
      });

      if (likeable_type === "Post") {
        await Post.increment("likes_count", { where: { id: likeable_id } });
      } else if (likeable_type === "Comment") {
        await Comment.increment("likes_count", { where: { id: likeable_id } });
      }

      return {
        action: "liked",
        likeable_type,
        likeable_id,
      };
    }
  }
}

module.exports = new LikeService();
