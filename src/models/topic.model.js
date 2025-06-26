module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define(
    "Topic",
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
