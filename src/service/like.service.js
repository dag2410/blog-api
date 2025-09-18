const { Like, Post, Comment, User } = require("@/models");
const notificationService = require("./notification.service");
const pusher = require("@/config/pusher");

class LikeService {
  async toggleLike({ user_id, likeable_type, likeable_id }) {
    const existingLike = await Like.findOne({
      where: { user_id, likeable_type, likeable_id },
    });

    let owner_id;

    if (likeable_type === "Post") {
      const post = await Post.findByPk(likeable_id);
      owner_id = post?.user_id;
    } else if (likeable_type === "Comment") {
      const comment = await Comment.findByPk(likeable_id);
      owner_id = comment?.user_id;
    }

    if (existingLike) {
      await existingLike.destroy();

      if (likeable_type === "Post") {
        await Post.decrement("likes_count", { where: { id: likeable_id } });
      } else if (likeable_type === "Comment") {
        await Comment.decrement("likes_count", { where: { id: likeable_id } });
      }

      await notificationService.delete({
        actor_id: user_id,
        receiver_id: owner_id,
        notifiable_type: likeable_type,
        notifiable_id: likeable_id,
        type: "like",
      });

      await pusher.trigger(`user-${owner_id}`, "new-notification", {
        action: "unliked",
        likeable_type,
        likeable_id,
        user_id,
      });

      await pusher.trigger(
        `${likeable_type.toLowerCase()}-${likeable_id}`,
        "like-updated",
        {
          action: "unliked",
          likeable_type,
          likeable_id,
          user_id,
        }
      );

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

      if (owner_id && owner_id !== user_id) {
        await notificationService.create(owner_id, {
          type: "like",
          title: ` liked your ${likeable_type.toLowerCase()}`,
          notifiable_type: likeable_type,
          notifiable_id: likeable_id,
          actor_id: user_id,
        });
      }

      await pusher.trigger(`user-${owner_id}`, "new-notification", {
        action: "liked",
        likeable_type,
        likeable_id,
        user_id,
      });

      await pusher.trigger(
        `${likeable_type.toLowerCase()}-${likeable_id}`,
        "like-updated",
        {
          action: "liked",
          likeable_type,
          likeable_id,
          user_id,
        }
      );

      return {
        action: "liked",
        likeable_type,
        likeable_id,
      };
    }
  }
}

module.exports = new LikeService();
