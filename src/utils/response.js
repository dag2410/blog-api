function success(res, status = 200, data, message) {
  res.status(status).json({
    success: true,
    data,
    message,
  });
}

function error(res, status = 400, message, errors) {
  res.status(status).json({
    success: false,
    message,
    errors,
  });
}

module.exports = {
  success,
  error,
};
