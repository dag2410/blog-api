const db = require("@/models");
const { Like, Post, Comment } = db;

class LikeService {
  static async createLike({ user_id, likeable_type, likeable_id }) {
    const existingLike = await Like.findOne({
      where: { user_id, likeable_type, likeable_id },
    });
    if (existingLike) {
      throw new Error("Already liked");
    }

    await Like.create({ user_id, likeable_type, likeable_id });

    if (likeable_type === "Post") {
      await Post.increment("likes_count", { where: { id: likeable_id } });
    } else if (likeable_type === "Comment") {
      await Comment.increment("likes_count", { where: { id: likeable_id } });
    }

    return { message: "Liked successfully" };
  }

  static async deleteLike({ user_id, likeable_type, likeable_id }) {
    const like = await Like.findOne({
      where: { user_id, likeable_type, likeable_id },
    });

    if (!like) {
      throw new Error("Like not found");
    }

    await like.destroy();

    if (likeable_type === "Post") {
      await Post.decrement("likes_count", { where: { id: likeable_id } });
    } else if (likeable_type === "Comment") {
      await Comment.decrement("likes_count", { where: { id: likeable_id } });
    }

    return { message: "Unliked successfully" };
  }
}

module.exports = LikeService;
