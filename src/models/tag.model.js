module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    "Tag",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
      },
    },
    { tableName: "tags", underscored: true, timestamps: true }
  );

  Tag.associate = (models) => {
    // Tag.belongsToMany(models.Post, {
    //   through: models.PostTag,
    //   foreignKey: "tag_id",
    //   otherKey: "post_id",
    //   as: "posts",
    // });
  };

  return Tag;
};
