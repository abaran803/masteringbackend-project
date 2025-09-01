const db = require("../../model");

const Recipe = db.recipies;

const createRecipe = async (req, res, next) => {
  const t = await db.sequelize.transaction();
  try {
    const { title, instruction, photos, created_by, ingredients, tags } =
      req.body;
    if (!title || !created_by) {
      await t.rollback();
      return res.status(400).send({
        message: "Title and created by is required",
      });
    }
    const matchingRecipe = await Recipe.findOne({
      where: {
        title,
      },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (matchingRecipe) {
      await t.rollback();
      return res.status(409).send({
        message: "Recipe already exist",
      });
    }
    const recipe = await Recipe.create(
      {
        title,
        instruction,
        photos,
        created_by,
      },
      { transaction: t }
    );
    if (ingredients?.length) {
      await recipe.addIngredients(ingredients, { transaction: t });
    }
    if (tags?.length) {
      await recipe.addTags(tags, { transaction: t });
    }
    await t.commit();
    res.status(200).send({
      message: "Recipe Created",
    });
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

const getAllRecipe = async (req, res, next) => {
  try {
    const recipies = await Recipe.findAll({
      include: [
        {
          model: db.users,
          as: "creater",
          attributes: ["username", "email"],
        },
        {
          model: db.ingredients,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: db.tags,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
      attributes: { exclude: "created_by" },
    });
    const transformed = recipies.map((r) => {
      const recipe = r.toJSON();
      recipe.ingredients = recipe.ingredients.map((i) => i.name);
      recipe.tags = recipe.tags.map((i) => i.name);
      return recipe;
    });
    res.status(200).send({
      message: "Fetched recipies suuccessfully",
      data: transformed,
    });
  } catch (err) {
    next(err);
  }
};

const getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let recipe = await Recipe.findOne({
      where: {
        id,
      },
      include: [
        {
          model: db.users,
          as: "creater",
          attributes: ["username", "email"],
        },
        {
          model: db.ingredients,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: db.tags,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
      attributes: { exclude: "created_by" },
    });
    recipe = recipe.toJSON();
    transformed = {
      ...recipe,
      ingredients: recipe.ingredients.map((i) => i.name),
    };
    res.status(200).send({
      message: "Fetched recipie suuccessfully",
      data: transformed,
    });
  } catch (err) {
    next(err);
  }
};

const updateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipeData = req.body;
    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      return res.status(404).send({
        message: "Recipe not found",
      });
    }
    await recipe.update(recipeData);
    res.status(200).send({
      message: "Recipe updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      return res.status(404).send({
        message: "Recipe not found",
      });
    }
    await recipe.destroy();
    res.status(200).send({
      message: "Recipe deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRecipe,
  getAllRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
