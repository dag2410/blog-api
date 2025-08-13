const settingService = require("@/service/setting.service");
const { success, error } = require("@/utils/response");

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      error(res, 400, "Missing required fields");
    }

    const result = await settingService.changePassword(
      req.user.id,
      currentPassword,
      newPassword
    );

    success(res, 200, result);
  } catch (err) {
    error(res, 400, err.message);
  }
};
exports.toggleTwoFactor = async (req, res) => {
  try {
    const { enabled } = req.body;

    const result = await settingService.toggleTwoFactor(req.user.id, enabled);

    success(res, 200, result);
  } catch (err) {
    error(res, 400, err.message);
  }
};
