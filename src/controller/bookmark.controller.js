const bookmarksService = require("@/service/bookmark.service");
const { success, error } = require("@/utils/response");

exports.toggleBookmark = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { post_id } = req.body;

    const result = await bookmarksService.toggleBookmark({
      user_id,
      post_id,
    });
    success(res, 200, result);
  } catch (err) {
    error(res, 403, err.message);
  }
};

exports.getByUser = async (req, res) => {
  try {
    const bookmarks = await bookmarksService.getBookmarkByUser({
      user_id: req.user.id,
    });
    success(res, 200, bookmarks);
  } catch (err) {
    error(res, 403, err.message);
  }
};

exports.deleteBookmarks = async (req, res) => {
  try {
    await bookmarksService.deleteBookmarks({
      user_id: req.user.id,
    });
    success(res, 200);
  } catch (err) {
    error(res, 403, err.message);
  }
};
