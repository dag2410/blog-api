const response = require("@/utils/response");
function handleError(error, req, res, next) {
  response.error(res, error.status ?? 500, error.toString(), error.errors);
}

module.exports = handleError;
