const db = require("../../models");

const Comment = db.comments;

const createComment = async (req, res, next) => {
  try {
    const { comment, recipe_id: recipeId } = req.body;
    if (!comment || !recipeId) {
      return res.status(400).send({
        message: "Comment, user id and recipe id is required",
      });
    }
    const matchingComment = await Comment.findOne({
      where: {
        comment,
        recipe_id: recipeId,
        user_id: req.user_id,
      },
    });
    if (matchingComment) {
      return res.status(409).send({
        message: "Comment already exist",
      });
    }
    await Comment.create({
      comment,
      recipe_id: recipeId,
      user_id: req.user_id,
    });
    res.status(200).send({
      message: "Comment Created",
    });
  } catch (err) {
    next(err);
  }
};

const getAllComment = async (req, res, next) => {
  try {
    const comment = await Comment.findAll();
    res.status(200).send({
      message: "Fetched comment suuccessfully",
      data: comment,
    });
  } catch (err) {
    next(err);
  }
};

const getCommentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let comment = await Comment.findOne({
      where: {
        id,
      },
    });
    res.status(200).send({
      message: "Fetched comment successfully",
      data: comment,
    });
  } catch (err) {
    next(err);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const commentData = req.body;
    if (!commentData.comment) {
      return res.status(400).send({
        message: "Comment is required",
      });
    }
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).send({
        message: "Comment not found",
      });
    }
    await comment.update(commentData);
    res.status(200).send({
      message: "Comment updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).send({
        message: "Comment not found",
      });
    }
    await comment.destroy();
    res.status(200).send({
      message: "Comment deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createComment,
  getAllComment,
  getCommentById,
  updateComment,
  deleteComment,
};
