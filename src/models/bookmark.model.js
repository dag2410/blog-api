module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define(
    "Bookmark",
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
    },
    { tableName: "bookmarks", underscored: true, timestamps: true }
  );

  Bookmark.associate = (models) => {
    Bookmark.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
    Bookmark.belongsTo(models.Post, {
      foreignKey: "post_id",
      as: "post",
    });
  };

  return Bookmark;
};
