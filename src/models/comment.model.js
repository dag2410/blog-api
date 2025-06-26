module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      post_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { tableName: "comments", underscored: true, timestamps: true }
  );
  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });

    Comment.belongsTo(models.Post, {
      foreignKey: "post_id",
      as: "post",
    });
  };

  return Comment;
};
