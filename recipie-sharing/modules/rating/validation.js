const { body, param } = require("express-validator");
const { validationError } = require("../../middleware/validationError");

const validateCreateRating = [
  body("rating")
    .exists()
    .withMessage("Rating is required")
    .bail()
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5"),

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

const validateUpdateRating = [
  param("id")
    .exists()
    .withMessage("Rating id is required")
    .bail()
    .isUUID()
    .withMessage("Rating id must be a valid UUID"),

  body("rating")
    .exists()
    .withMessage("Rating is required")
    .bail()
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5"),

  body("recipe_id")
    .exists()
    .withMessage("Rating id is required")
    .bail()
    .isUUID()
    .withMessage("Recipe id must be a valid UUID"),

  body("user_id")
    .optional()
    .isUUID()
    .withMessage("User id must be a valid UUID"),

  validationError,
];

const validateRatingId = [
  param("id")
    .exists()
    .withMessage("Rating id is required")
    .bail()
    .isUUID()
    .withMessage("Rating id must be a valid UUID"),

  validationError,
];

module.exports = {
  validateCreateRating,
  validateUpdateRating,
  validateRatingId,
};
