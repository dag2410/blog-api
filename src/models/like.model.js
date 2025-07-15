module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "Like",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      likeable_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      likeable_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { tableName: "likes", underscored: true, timestamps: true }
  );

  Like.associate = (models) => {
    // Like.belongsTo(models.User, {
    //   foreignKey: "user_id",
    //   as: "user",
    // });
    // // Polymorphic associations
    // Like.belongsTo(models.Post, {
    //   foreignKey: "likeable_id",
    //   constraints: false,
    //   as: "post",
    // });
    // Like.belongsTo(models.Comment, {
    //   foreignKey: "likeable_id",
    //   constraints: false,
    //   as: "comment",
    // });
  };

  return Like;
};
