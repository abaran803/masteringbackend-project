module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    "rating",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      rating: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      recipe_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  return Rating;
};
