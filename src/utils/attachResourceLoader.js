const throwError = require("@/utils/throwError");

const models = {
  user: require("@/service/user.service"),
  post: require("@/service/post.service"),
  comment: require("@/service/comment.service"),
  topic: require("@/service/topic.service"),
};
function attachResourceLoader(router, params) {
  params.forEach((param) => {
    router.param(param, async (req, res, next, id) => {
      const resource = await models[param].getById(id);
      if (!resource) throwError(404, `${param} not found.`);
      req[param] = resource;
      next();
    });
  });
}

module.exports = attachResourceLoader;
