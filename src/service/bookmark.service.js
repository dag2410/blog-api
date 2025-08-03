const { Like, Post, Comment, Bookmark, User, Topic } = require("@/models");

class BookmarkService {
  async toggleBookmark({ user_id, post_id }) {
    const existing = await Bookmark.findOne({
      where: {
        user_id,
        post_id,
      },
    });
    if (!existing) {
      await Bookmark.create({
        user_id,
        post_id,
      });
      return { message: "Đã bookmark bài viết.", bookmarked: true, post_id };
    } else {
      await Bookmark.destroy({
        where: {
          user_id,
          post_id,
        },
      });
      return { message: "Đã bỏ bookmark bài viết.", bookmarked: false };
    }
  }

  async getBookmarkByUser({ user_id }) {
    return await Bookmark.findAll({
      where: {
        user_id,
      },
      include: [
        {
          model: Post,
          as: "post",
          include: [
            {
              model: User,
              as: "users",
            },
            {
              model: Topic,
              as: "topics",
            },

            {
              model: Like,
              as: "likes",
            },
            {
              model: Bookmark,
              as: "bookmarks",
            },
          ],
        },
      ],
      order: [["created_at", "DESC"]],
    });
  }

  async deleteBookmarks({ user_id }) {
    return await Bookmark.destroy({
      where: {
        user_id,
      },
    });
  }
}

module.exports = new BookmarkService();
