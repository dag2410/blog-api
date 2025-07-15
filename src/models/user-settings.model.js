module.exports = (sequelize, DataTypes) => {
  const UserSetting = sequelize.define(
    "UserSetting",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
      },
      data: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    { tableName: "user_settings", underscored: true, timestamps: true }
  );

  UserSetting.associate = (models) => {
    // UserSetting.belongsTo(models.User, {
    //   foreignKey: "user_id",
    //   as: "user",
    // });
  };

  return UserSetting;
};
