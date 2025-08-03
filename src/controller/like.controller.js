const likesService = require("@/service/like.service");
const { success } = require("@/utils/response");

exports.toggleLike = async (req, res) => {
  const { likeable_type, likeable_id } = req.body;
  const user_id = req.user.id;

  const result = await likesService.toggleLike({
    user_id,
    likeable_type,
    likeable_id,
  });

  success(res, 200, result);
};
