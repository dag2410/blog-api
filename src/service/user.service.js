const { User } = require("@/models");

class UserService {
  async getAll() {
    const users = await User.findAll();
    return users;
  }

  async getById(id) {
    const user = await User.findByPk(id);
    return user;
  }

  async create(data) {
    const user = await User.create(data);
    return user;
  }

  async update(id, data) {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.update(data);
    return user;
  }

  async remove(id) {
    const user = await User.findByPk(id);
    await user.destroy();
    return user;
  }
}

module.exports = new UserService();
