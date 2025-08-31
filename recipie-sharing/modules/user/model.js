const user = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        isEmail: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: true }
  );

  return User;
};

const follow = (sequelize, DataTypes) => {
  const Follow = sequelize.define(
    "follow",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      follower_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      following_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  return Follow;
};

module.exports = { user, follow };
