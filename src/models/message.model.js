module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
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
      conversation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(50),
        defaultValue: "text",
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      read_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    { tableName: "messages", underscored: true, timestamps: true }
  );

  Message.associate = (models) => {
    Message.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "sender",
    });
    Message.belongsTo(models.Conversation, {
      foreignKey: "conversation_id",
      as: "conversation",
    });
  };

  return Message;
};
