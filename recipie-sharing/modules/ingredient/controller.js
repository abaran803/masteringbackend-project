const db = require("../../model");

const Ingredients = db.ingredients;

const createIngredient = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({
        message: "Ingredient name is required",
      });
    }
    const matchingIngredient = await Ingredients.findOne({
      where: {
        name,
      },
    });
    if (matchingIngredient) {
      return res.status(409).send({
        message: "Ingredient already exist",
      });
    }
    await Ingredients.create({
      name,
    });
    res.status(201).send({ message: "Ingredient Created" });
  } catch (err) {
    next(err);
  }
};

const getAllIngredients = async (req, res, next) => {
  try {
    const allIngredients = await Ingredients.findAll();
    res.status(200).send({
      message: "Fetched ingredients suuccessfully",
      data: allIngredients,
    });
  } catch (err) {
    next(err);
  }
};

const getIngredientById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ingredient = await Ingredients.findOne({
      where: {
        id,
      },
    });
    res.status(200).send({
      message: "Fetched ingredient successfully",
      data: ingredient,
    });
  } catch (err) {
    next(err);
  }
};

const updateIngredient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name: updatedName } = req.body;
    if (!id || !updatedName) {
      return res.status(400).send({
        message: "Ingredient id and name is required",
      });
    }
    const ingredient = await Ingredients.findByPk(id);
    if (!ingredient) {
      return res.status(404).send({
        message: "Ingredient not found",
      });
    }
    if (ingredient.name === updatedName) {
      return res.status(409).send({
        message: "No update found",
      });
    }
    await ingredient.update({ name: updatedName });
    res.status(200).send({
      message: "Ingredient updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const deleteIngredient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const matchingIngredient = await Ingredients.findByPk(id);
    if (!matchingIngredient) {
      return res.status(404).send({
        message: "Ingredient not found",
      });
    }
    await Ingredients.destroy({
      where: {
        id,
      },
    });
    res.status(200).send({
      message: "Ingredient deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createIngredient,
  getAllIngredients,
  getIngredientById,
  updateIngredient,
  deleteIngredient,
};
