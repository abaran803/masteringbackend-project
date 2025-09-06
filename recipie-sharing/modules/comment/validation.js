const { body, param } = require("express-validator");
const { validationError } = require("../../middleware/validationError");

const validateCreateComment = [
  body("comment")
    .exists()
    .withMessage("Comment is required")
    .bail()
    .isString()
    .withMessage("Comment must be a string")
    .isLength({ min: 1, max: 1000 })
    .withMessage("Comment must be between 1 and 1000 characters"),

  body("recipe_id")
    .exists()
    .withMessage("Recipe id is required")
    .bail()
    .isUUID()
    .withMessage("Recipe id must be a valid UUID"),

  body("user_id")
    .optional() // skip if handled by auth
    .isUUID()
    .withMessage("User id must be a valid UUID"),

  validationError,
];

const validateUpdateComment = [
  param("id")
    .exists()
    .withMessage("Comment id is required")
    .bail()
    .isUUID()
    .withMessage("Comment id must be a valid UUID"),

  body("comment")
    .exists()
    .withMessage("Comment is required")
    .bail()
    .isString()
    .withMessage("Comment must be a string")
    .isLength({ min: 1, max: 1000 })
    .withMessage("Comment must be between 1 and 1000 characters"),

  validationError,
];

const validateCommentId = [
  param("id")
    .exists()
    .withMessage("Comment id is required")
    .bail()
    .isUUID()
    .withMessage("Comment id must be a valid UUID"),

  validationError,
];

module.exports = {
  validateCreateComment,
  validateUpdateComment,
  validateCommentId,
};
