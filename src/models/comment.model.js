// models/Comment.js
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
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
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      likes_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
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
    Comment.belongsTo(models.Comment, {
      foreignKey: "parent_id",
      as: "parent",
    });
    Comment.hasMany(models.Comment, {
      foreignKey: "parent_id",
      as: "replies",
    });
    Comment.hasMany(models.Like, {
      foreignKey: "likeable_id",
      constraints: false,
      scope: {
        likeable_type: "Comment",
      },
      as: "likes",
    });
  };

  return Comment;
};
