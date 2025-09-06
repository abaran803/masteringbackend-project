const { body, param } = require("express-validator");
const { validationError } = require("../../middleware/validationError");

// Recipe validations
const validateCreateRecipe = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .bail()
    .isString()
    .withMessage("Title must be a string")
    .bail()
    .isLength({ min: 3, max: 255 })
    .withMessage("Title must be between 3 and 255 characters"),

  body("ingredients")
    .exists()
    .withMessage("Ingredients is required")
    .bail()
    .isArray({ min: 1 })
    .withMessage("Ingredients must be a non-empty array"),

  body("instruction")
    .optional()
    .isString()
    .withMessage("Instruction must be a string")
    .isLength({ max: 5000 })
    .withMessage("Instruction cannot exceed 5000 characters"),

  body("photos")
    .optional()
    .isArray()
    .withMessage("Photos must be an array of strings")
    .custom((arr) => arr.every((p) => typeof p === "string"))
    .withMessage("Each photo must be a string"),

  body("categories")
    .exists()
    .withMessage("Categories is required")
    .bail()
    .isArray({ min: 1 })
    .withMessage("Categories must be an array of strings")
    .bail()
    .custom((arr) => arr.every((p) => typeof p === "string"))
    .withMessage("Each category must be a string"),

  validationError,
];

const validateUpdateRecipe = [
  param("id")
    .exists()
    .withMessage("Recipe id is required")
    .bail()
    .isUUID()
    .withMessage("Recipe id must be a valid UUID"),

  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .bail()
    .isLength({ min: 3, max: 255 })
    .withMessage("Title must be between 3 and 255 characters"),

  body("instruction")
    .optional()
    .isString()
    .withMessage("Instruction must be a string")
    .isLength({ max: 5000 })
    .withMessage("Instruction cannot exceed 5000 characters"),

  validationError,
];

const validateRecipeId = [
  param("id")
    .exists()
    .withMessage("Recipe id is required")
    .bail()
    .isUUID()
    .withMessage("Recipe id must be a valid UUID"),

  validationError,
];

// Comment
const validateAddComment = [
  param("id").isUUID().withMessage("Recipe id must be a valid UUID"),
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

// Rating
const validateAddRating = [
  param("id").isUUID().withMessage("Recipe id must be a valid UUID"),
  body("rating")
    .exists()
    .withMessage("Rating is required")
    .bail()
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5"),

  validationError,
];

// Tag
const validateAddTag = [
  param("id").isUUID().withMessage("Recipe id must be a valid UUID"),
  param("tag_id")
    .optional()
    .isUUID()
    .withMessage("Tag id must be a valid UUID"),

  validationError,
];

// Categories
const validateAddCategories = [
  param("id").isUUID().withMessage("Recipe id must be a valid UUID"),
  body("categories")
    .isArray({ min: 1 })
    .withMessage("Categories must be a non-empty array")
    .custom((arr) => arr.every((c) => typeof c === "string"))
    .withMessage("Each category id must be a string (UUID)"),

  validationError,
];

module.exports = {
  validateCreateRecipe,
  validateUpdateRecipe,
  validateRecipeId,
  validateAddComment,
  validateAddRating,
  validateAddTag,
  validateAddCategories,
};
