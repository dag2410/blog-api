module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      two_factor_enabled: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0,
      },
      two_factor_secret: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      about: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      post_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      followers_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      following_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      likes_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      website_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      twitter_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      github_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      linkedin_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      email_send_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      verified_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      last_login: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    { tableName: "users", underscored: true, timestamps: true }
  );

  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: "user_id",
      as: "posts",
    });
    User.hasMany(models.Comment, {
      foreignKey: "user_id",
      as: "comments",
    });
    User.hasMany(models.Like, {
      foreignKey: "user_id",
      as: "likes",
    });
    User.hasMany(models.Bookmark, {
      foreignKey: "user_id",
      as: "bookmarks",
    });
    // User.hasMany(models.Message, {
    //   foreignKey: "user_id",
    //   as: "messages",
    // });
    // User.belongsToMany(models.Conversation, {
    //   through: models.UserConversation,
    //   foreignKey: "user_id",
    //   otherKey: "conversation_id",
    //   as: "conversations",
    // });
    // User.belongsToMany(models.Notification, {
    //   through: models.UserNotification,
    //   foreignKey: "user_id",
    //   otherKey: "notification_id",
    //   as: "notifications",
    // });
    // User.hasOne(models.UserSetting, {
    //   foreignKey: "user_id",
    //   as: "settings",
    // });
    User.belongsToMany(models.User, {
      through: models.Follow,
      foreignKey: "following_id",
      otherKey: "followed_id",
      as: "following",
    });
    User.belongsToMany(models.User, {
      through: models.Follow,
      foreignKey: "followed_id",
      otherKey: "following_id",
      as: "followers",
    });
  };

  return User;
};
