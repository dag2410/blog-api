const { Comment, User, Post, Like } = require("@/models");

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
    return comment;
  }

  async update(id, data) {
    const comment = await Comment.findByPk(id);
    if (!comment) return null;
    await comment.update(data);
    return comment;
  }

  async remove(id) {
    const comment = await Comment.findByPk(id);
    if (!comment) return null;
    await comment.destroy();
    return comment;
  }
}

module.exports = new CommentsService();
