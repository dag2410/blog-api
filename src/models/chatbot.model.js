module.exports = (sequelize, DataTypes) => {
  const Chatbot = sequelize.define(
    "Chatbot",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("user", "assistant", "system"),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { tableName: "ai_chats", underscored: true, timestamps: true }
  );

  return Chatbot;
};
