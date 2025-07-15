module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "Notification",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      notifiable_type: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      notifiable_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    { tableName: "notifications", underscored: true, timestamps: true }
  );

  Notification.associate = (models) => {
    // Notification.belongsToMany(models.User, {
    //   through: models.UserNotification,
    //   foreignKey: "notification_id",
    //   otherKey: "user_id",
    //   as: "users",
    // });
  };

  return Notification;
};
