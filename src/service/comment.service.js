const { Comment, User, Post, Like } = require("@/models");
const notificationService = require("./notification.service");
const pusher = require("@/config/pusher");

class CommentsService {
  async getAll(postId) {
    const comments = await Comment.findAll({
      where: {
        post_id: postId,
      },
      include: [
        {
          model: Like,
          as: "likes",
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "avatar"],
        },
      ],
      order: [["created_at", "DESC"]],
    });
    return comments;
  }

  async getById(id) {
    const comment = await Comment.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",
        },
        {
          model: Post,
          as: "post",
        },
      ],
    });
    return comment;
  }

  async create(data) {
    const comment = await Comment.create(data);

    const fullComment = await Comment.findByPk(comment.id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "avatar"],
        },
        {
          model: Like,
          as: "likes",
        },
      ],
    });

    await pusher.trigger(`post-${comment.post_id}`, "new-comment", {
      comment: fullComment,
    });

    let recipientId = null;
    let notificationType = "";

    if (data.parent_id) {
      const parentComment = await Comment.findByPk(data.parent_id);
      if (parentComment && parentComment.user_id !== data.user_id) {
        recipientId = parentComment.user_id;
        notificationType = "reply";
      }
    } else {
      const post = await Post.findByPk(comment.post_id);
      if (post && post.user_id !== data.user_id) {
        recipientId = post.user_id;
        notificationType = "comment";
      }
    }

    if (recipientId) {
      await notificationService.create(recipientId, {
        type: notificationType,
        title: `${
          notificationType === "reply" ? " replied to" : " commented on"
        } your ${notificationType === "reply" ? "comment" : "post"}`,
        notifiable_type: "comment",
        notifiable_id: comment.id,
        actor_id: data.user_id,
      });

      await pusher.trigger(`user-${recipientId}`, "new-notification", {
        action: notificationType,
        comment_id: comment.id,
        post_id: comment.post_id,
        user_id: data.user_id,
      });
    }

    return fullComment;
  }

  async update(id, data) {
    const comment = await Comment.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "avatar"],
        },
        {
          model: Like,
          as: "likes",
        },
      ],
    });
    if (!comment) return null;

    await comment.update(data);

    await pusher.trigger(`post-${comment.post_id}`, "update-comment", {
      comment,
    });

    return comment;
  }
  async remove(id) {
    const comment = await Comment.findByPk(id);
    if (!comment) return null;

    const post = await Post.findByPk(comment.post_id);

    await pusher.trigger(`post-${comment.post_id}`, "delete-comment", {
      comment_id: comment.id,
    });

    if (post) {
      await notificationService.delete({
        actor_id: comment.user_id,
        receiver_id: post.user_id,
        notifiable_type: "Comment",
        notifiable_id: comment.id,
        type: "comment",
      });
      await pusher.trigger(`user-${post.user_id}`, "new-notification", {
        action: "delete_comment",
        comment_id: comment.id,
        post_id: comment.post_id,
        user_id: comment.user_id,
      });
    }

    await comment.destroy();
    return comment;
  }
}

module.exports = new CommentsService();
