module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define(
    "RefreshToken",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      expired_at: {
        type: DataTypes.DATE,
      },
    },
    { tableName: "refresh_tokens", underscored: true, timestamps: true }
  );

  RefreshToken.associate = (models) => {
    RefreshToken.belongsTo(models.User);
  };

  return RefreshToken;
};
