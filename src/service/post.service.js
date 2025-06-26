const { Post, Comment } = require("../models");

class PostsService {
  async getAll() {
    const posts = await Post.findAll();
    return posts;
  }

  async getById(id) {
    const post = await Post.findByPk(id, {
      include: [
        {
          model: Comment,
          as: "comments",
        },
      ],
    });
    return post;
  }

  async create(data) {
    const post = await Post.create(data);
    return post;
  }

  async update(id, data) {
    const post = await Post.findByPk(id);
    if (!post) return null;
    await post.update(data);
    return post;
  }

  async remove(id) {
    const post = await Post.findByPk(id);
    if (!post) return null;
    await post.destroy();
    return post;
  }
}

module.exports = new PostsService();
