const postsService = require("@/service/post.service");
const { success } = require("@/utils/response");

exports.getList = async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const topic = req.query.topic;
  const maxLimit = 50;
  const safeLimit = limit > maxLimit ? maxLimit : limit;

  const { items, total } = await postsService.getAll(page, safeLimit, topic);

  success(res, 200, {
    data: items,
    pagination: {
      total,
      page,
      limit: safeLimit,
      totalPage: Math.ceil(total / safeLimit),
      hasNextPage: page < Math.ceil(total / safeLimit),
      hasPrevPage: page > 1,
    },
  });
};

exports.getOne = async (req, res) => {
  success(res, 200, req.post);
};

exports.create = async (req, res) => {
  const post = await postsService.create(req.body);
  success(res, 201, post);
};

exports.update = async (req, res) => {
  const post = await postsService.update(req.post.slug, req.body);
  success(res, 200, post);
};

exports.remove = async (req, res) => {
  await postsService.remove(req.post.slug);
  success(res, 200);
};

exports.getUserPosts = async (req, res) => {
  const { userId } = req.params;
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const maxLimit = 50;
  const safeLimit = limit > maxLimit ? maxLimit : limit;

  const { items, total } = await postsService.getByUserId(
    userId,
    page,
    safeLimit
  );

  success(res, 200, {
    data: items,
    pagination: {
      total,
      page,
      limit: safeLimit,
      totalPage: Math.ceil(total / safeLimit),
      hasNextPage: page < Math.ceil(total / safeLimit),
      hasPrevPage: page > 1,
    },
  });
};

exports.getFeatured = async (req, res) => {
  const featuredPosts = await postsService.getFeatured();
  success(res, 200, featuredPosts);
};

exports.getRecent = async (req, res) => {
  const recentPosts = await postsService.getRecent();
  success(res, 200, recentPosts);
};

exports.getRelated = async (req, res) => {
  const { topicId, excludeSlug } = req.query;
  console.log(topicId, excludeSlug);
  const relatedPosts = await postsService.getRelated(topicId, excludeSlug, 3);
  success(res, 200, relatedPosts);
};
