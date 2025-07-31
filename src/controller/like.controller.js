const likeService = require("@/service/like.service");
const { success } = require("@/utils/response");

exports.like = async (req, res) => {
  const { likeable_type, likeable_id } = req.body;
  const user_id = req.user.id;

  const result = await likeService.createLike({
    user_id,
    likeable_type,
    likeable_id,
  });
  success(res, 200, result);
};

exports.unlike = async (req, res) => {
  const { likeable_type, likeable_id } = req.body;
  const user_id = req.user.id;

  const result = await likeService.deleteLike({
    user_id,
    likeable_type,
    likeable_id,
  });
  success(res, 200, result);
};
