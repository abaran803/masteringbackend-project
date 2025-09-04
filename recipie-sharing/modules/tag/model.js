const tag = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    "tag",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { timestamps: true }
  );

  return Tag;
};

const recipeTag = (sequelize, DataTypes) => {
  const RecipeTag = sequelize.define(
    "recipeTag",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      recipe_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      tag_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  return RecipeTag;
};

module.exports = {
  tag,
  recipeTag,
};
