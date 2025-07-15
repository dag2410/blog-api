module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define(
    "Follow",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      following_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      followed_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { tableName: "follows", underscored: true, timestamps: true }
  );

  Follow.associate = (models) => {
    // Follow.belongsTo(models.User, {
    //   foreignKey: "following_id",
    //   as: "follower",
    // });
    // Follow.belongsTo(models.User, {
    //   foreignKey: "followed_id",
    //   as: "followed",
    // });
  };

  return Follow;
};
