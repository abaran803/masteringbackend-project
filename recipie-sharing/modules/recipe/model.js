module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      instruction: {
        type: DataTypes.TEXT,
      },
      photos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      created_by: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  return Recipe;
};
