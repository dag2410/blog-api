const { Comment, User, Post } = require("@/models");

class CommentsService {
  async getAll() {
    const comments = await Comment.findAll();
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
