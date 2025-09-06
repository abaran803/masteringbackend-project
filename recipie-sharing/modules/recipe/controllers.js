const { Op } = require("sequelize");
const db = require("../../models");

const Recipe = db.recipes;
const User = db.users;
const Ratings = db.ratings;
const Tag = db.tags;

const createRecipe = async (req, res, next) => {
  const t = await db.sequelize.transaction();
  try {
    const { title, instruction, ingredients, tags, categories } = req.body;
    if (!title || !categories) {
      await t.rollback();
      return res.status(400).send({
        message: "Title, categories and created by is required",
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
        photos: req.uploadedUrls,
        created_by: req.user_id,
      },
      { transaction: t }
    );
    if (ingredients?.length) {
      await recipe.addIngredients(ingredients, { transaction: t });
    }
    if (tags?.length) {
      await recipe.addTags(tags, { transaction: t });
    }
    if (categories?.length) {
      await recipe.addCategories(categories, { transaction: t });
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
    const { search = "" } = req.query;
    const recipes = await Recipe.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${search}%` } },
          { instruction: { [Op.iLike]: `%${search}%` } },
          { "$ingredients.name$": { [Op.iLike]: `%${search}%` } },
          { "$creater.username$": { [Op.iLike]: `%${search}%` } },
          { "$tags.name$": { [Op.iLike]: `%${search}%` } },
        ],
      },
      include: [
        {
          model: db.users,
          as: "creater",
          attributes: ["username", "email"],
          required: false,
        },
        {
          model: db.ingredients,
          attributes: ["name"],
          through: {
            attributes: [],
          },
          required: false,
        },
        {
          model: db.tags,
          attributes: ["name"],
          through: {
            attributes: [],
          },
          required: false,
        },
        {
          model: db.users,
          as: "FavouritedBy",
          attributes: ["username", "email"],
          through: {
            attributes: [],
          },
          required: false,
        },
      ],
      attributes: { exclude: "created_by" },
    });
    const transformed = recipes.map((r) => {
      const recipe = r.toJSON();
      recipe.ingredients = recipe.ingredients.map((i) => i.name);
      recipe.tags = recipe.tags.map((i) => i.name);
      return recipe;
    });
    res.status(200).send({
      message: "Fetched recipes suuccessfully",
      data: transformed,
    });
  } catch (err) {
    next(err);
  }
};

const getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let recipe = await Recipe.findByPk(id, {
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
        {
          model: db.users,
          attributes: ["username", "email"],
          as: "FavouritedBy",
          through: {
            attributes: [],
          },
        },
        {
          model: db.ratings,
          as: "ratings",
          attributes: ["rating"],
          include: [
            {
              model: db.users,
              as: "userRatingRecipe",
              attributes: ["id", "username", "email"],
            },
          ],
        },
        {
          model: db.comments,
          as: "comments",
          attributes: ["comment"],
          include: [
            {
              model: User,
              as: "userCommented",
              attributes: ["username", "email"],
            },
          ],
        },
        {
          model: db.categories,
          attributes: ["name", "type"],
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
      tags: recipe.tags.map((i) => i.name),
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

const markFavourite = async (req, res, next) => {
  try {
    const { id: recipeId } = req.params;
    if (!recipeId) {
      return res.status(400).send({
        message: "Recipe id is required",
      });
    }
    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      return res.status(404).send({
        message: "Recipe not found",
      });
    }
    const user = await User.findByPk(req.user_id);
    await recipe.addFavouritedBy(user);
    res.status(200).send({ message: "Recipe marked favourite" });
  } catch (err) {
    next(err);
  }
};

const addComment = async (req, res, next) => {
  try {
    const { id: recipeId } = req.params;
    const { comment } = req.body;
    if (!recipeId) {
      return res.status(400).send({
        message: "Recipe id is required",
      });
    }
    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      return res.status(404).send({
        message: "Recipe not found",
      });
    }
    const user = await User.findByPk(req.user_id);
    await recipe.addCommentedBy(user, { through: { comment } });
    res.status(200).send({ message: "Commented on Recipe" });
  } catch (err) {
    next(err);
  }
};

const addRating = async (req, res, next) => {
  try {
    const { id: recipeId } = req.params;
    const { rating } = req.body;
    if (!recipeId) {
      return res.status(400).send({
        message: "Recipe id is required",
      });
    }
    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      return res.status(404).send({
        message: "Recipe not found",
      });
    }
    const user = await User.findByPk(req.user_id);
    const checkAleadyRated = await Ratings.findOne({
      where: {
        user_id: req.user_id,
        recipe_id: recipeId,
      },
    });
    if (checkAleadyRated) {
      await checkAleadyRated.update({
        rating,
      });
      return res.status(200).send({
        message: "Rating updated successfully",
      });
    }
    await recipe.addRatedBy(user, { through: { rating } });
    res.status(200).send({ message: "Racipe Rated Successfully" });
  } catch (err) {
    next(err);
  }
};

const addTag = async (req, res, next) => {
  const t = await db.sequelize.transaction();
  try {
    const { id: recipeId, tag_id: tagId } = req.params;
    if (!recipeId) {
      return res.status(400).send({
        message: "Recipe id is required",
      });
    }
    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      return res.status(404).send({
        message: "Recipe not found",
      });
    }
    let tag;
    if (tagId) {
      tag = await Tag.findByPk(tagId);
    } else {
      tag = await Tag.create({ name: req.body.name }, { transaction: t });
    }
    await recipe.addTag(tag, { transaction: t });
    t.commit();
    res.status(200).send({ message: "Recipe tagged Successfully" });
  } catch (err) {
    t.rollback();
    next(err);
  }
};

const addCategories = async (req, res, next) => {
  try {
    const { id: recipeId } = req.params;
    const { categories } = req.body;
    if (!recipeId) {
      return res.status(400).send({
        message: "Recipe id is required",
      });
    }
    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      return res.status(404).send({
        message: "Recipe not found",
      });
    }
    await recipe.addCategories(categories);
    res.status(200).send({ message: "Recipe categorised Successfully" });
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
  markFavourite,
  addComment,
  addRating,
  addTag,
  addCategories,
};
