module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define(
    "Follow",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      following_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      followed_id: {
        type: DataTypes.BIGINT,
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
