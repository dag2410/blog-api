module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
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
      conversation_id: {
        type: DataTypes.BIGINT,
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
      delete_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    { tableName: "message", underscored: true, timestamps: true }
  );

  Message.associate = (models) => {
    // Message.belongsTo(models.User, {
    //   foreignKey: "user_id",
    //   as: "user",
    // });
    // Message.belongsTo(models.Conversation, {
    //   foreignKey: "conversation_id",
    //   as: "conversation",
    // });
  };

  return Message;
};
