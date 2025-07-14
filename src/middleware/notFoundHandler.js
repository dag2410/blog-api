const { error } = require("@/utils/response");
const notFoundHandler = (req, res) => {
  error(res, 400, "Resource not found");
};

module.exports = notFoundHandler;
