const db = require("../../models");

const Rating = db.ratings;

const createRating = async (req, res, next) => {
  try {
    const { rating, recipe_id: recipeId } = req.body;
    if (!rating || !recipeId) {
      return res.status(400).send({
        message: "Rating, user id and recipe id is required",
      });
    }
    const matchingRating = await Rating.findOne({
      where: {
        recipe_id: recipeId,
        user_id: req.user_id,
      },
    });
    if (matchingRating) {
      matchingRating.update({ rating });
      return res.status(200).send({
        message: "Rating updated",
      });
    }
    await Rating.create({
      rating,
      recipe_id: recipeId,
      user_id: req.user_id,
    });
    res.status(200).send({
      message: "Rating Created",
    });
  } catch (err) {
    next(err);
  }
};

const getAllRating = async (req, res, next) => {
  try {
    const rating = await Rating.findAll();
    res.status(200).send({
      message: "Fetched rating suuccessfully",
      data: rating,
    });
  } catch (err) {
    next(err);
  }
};

const getRatingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let rating = await Rating.findOne({
      where: {
        id,
      },
    });
    res.status(200).send({
      message: "Fetched rating successfully",
      data: rating,
    });
  } catch (err) {
    next(err);
  }
};

const updateRating = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ratingData = req.body;
    if (!ratingData.rating) {
      return res.status(400).send({
        message: "Rating is required",
      });
    }
    const rating = await Rating.findByPk(id);
    if (!rating) {
      return res.status(404).send({
        message: "Rating not found",
      });
    }
    await rating.update(ratingData);
    res.status(200).send({
      message: "Rating updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const deleteRating = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rating = await Rating.findByPk(id);
    if (!rating) {
      return res.status(404).send({
        message: "Rating not found",
      });
    }
    await rating.destroy();
    res.status(200).send({
      message: "Rating deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRating,
  getAllRating,
  getRatingById,
  updateRating,
  deleteRating,
};
