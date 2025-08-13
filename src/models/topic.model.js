module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define(
    "Topic",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(159),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      posts_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    { tableName: "topics", underscored: true, timestamps: true }
  );

  Topic.associate = (models) => {
    Topic.belongsToMany(models.Post, {
      through: "topics_posts",
      foreignKey: "topic_id",
      otherKey: "post_id",
      as: "posts",
    });
  };

  return Topic;
};
