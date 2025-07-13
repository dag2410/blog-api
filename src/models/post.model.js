module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
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
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      cover: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(50),
        defaultValue: "draft",
      },
      meta_title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      meta_description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      visibility: {
        type: DataTypes.STRING,
        defaultValue: "public",
      },
      views_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      likes_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      published_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    { tableName: "posts", underscored: true, timestamps: true }
  );

  Post.associate = (models) => {
    // Post.belongsTo(models.User, {
    //   foreignKey: "user_id",
    //   as: "user",
    // });
    // Post.hasMany(models.Comment, {
    //   foreignKey: "post_id",
    //   as: "comments",
    // });
    // Post.belongsToMany(models.Topic, {
    //   through: "topics_posts",
    //   foreignKey: "post_id",
    //   otherKey: "topic_id",
    //   as: "topics",
    // });
    // Post.belongsToMany(models.Tag, {
    //   through: models.PostTag,
    //   foreignKey: "post_id",
    //   otherKey: "tag_id",
    //   as: "tags",
    // });
    // Post.hasMany(models.Like, {
    //   foreignKey: "likeable_id",
    //   constraints: false,
    //   scope: {
    //     likeable_type: "Post",
    //   },
    //   as: "likes",
    // });
    // Post.hasMany(models.Bookmark, {
    //   foreignKey: "post_id",
    //   as: "bookmarks",
    // });
  };

  return Post;
};
