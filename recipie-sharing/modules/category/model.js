const category = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "category",
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
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  return Category;
};

const recipeCategory = (sequelize, DataTypes) => {
  const RecipeCategory = sequelize.define(
    "recipe_category",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      category_id: {
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

  return RecipeCategory;
};

module.exports = { category, recipeCategory };
