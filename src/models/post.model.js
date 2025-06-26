module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      published_at: {
        type: DataTypes.DATE,
      },
    },
    { tableName: "posts", underscored: true, timestamps: true }
  );

  Post.associate = (models) => {
    Post.hasMany(models.Comment, {
      foreignKey: "post_id",
      as: "comments",
    });

    Post.belongsToMany(models.Topic, {
      through: "topics_posts",
      foreignKey: "post_id",
      otherKey: "topic_id",
      as: "topics",
    });
  };

  return Post;
};
