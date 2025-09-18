const throwError = require("@/utils/throwError");

const models = {
  user: require("@/service/user.service"),
  post: require("@/service/post.service"),
  comment: require("@/service/comment.service"),
  topic: require("@/service/topic.service"),
  notification: require("@/service/notification.service"),
  conversation: require("@/service/conversation.service"),
};

const useSlug = ["post", "topic"];

function attachResourceLoader(router, params) {
  params.forEach((param) => {
    router.param(param, async (req, res, next, idOrSlug) => {
      const service = models[params];
      const resource = useSlug.includes(param)
        ? await service.getBySlug(idOrSlug)
        : await service.getById(idOrSlug);

      if (!resource) throwError(404, `${param} not found.`);
      req[param] = resource;
      next();
    });
  });
}

module.exports = attachResourceLoader;
