module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define(
    "Conversation",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      last_message_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    { tableName: "conversations", underscored: true, timestamps: true }
  );

  Conversation.associate = (models) => {
    // Conversation.belongsToMany(models.User, {
    //   through: models.UserConversation,
    //   foreignKey: "conversation_id",
    //   otherKey: "user_id",
    //   as: "users",
    // });
    // Conversation.hasMany(models.Message, {
    //   foreignKey: "conversation_id",
    //   as: "messages",
    // });
  };

  return Conversation;
};
