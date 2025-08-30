module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define(
    "ingredient",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  return Ingredient;
};
