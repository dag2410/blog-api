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
      actor_id: {
        type: DataTypes.INTEGER,
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
    Notification.belongsToMany(models.User, {
      through: "user_notification",
      foreignKey: "notification_id",
      otherKey: "user_id",
      as: "receivers",
    });
    Notification.belongsTo(models.User, {
      foreignKey: "actor_id",
      as: "actor",
    });
  };

  return Notification;
};
