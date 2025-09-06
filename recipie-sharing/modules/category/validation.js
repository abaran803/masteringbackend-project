const { body, param } = require("express-validator");
const { validationError } = require("../../middleware/validationError");

const validateCreateCategory = [
  body("name")
    .exists()
    .withMessage("Category name is required")
    .bail()
    .isString()
    .withMessage("Category name must be a string")
    .isLength({ min: 1, max: 100 })
    .withMessage("Category name must be between 1 and 100 characters"),

  body("type")
    .exists()
    .withMessage("Category type is required")
    .bail()
    .isString()
    .withMessage("Category type must be a string")
    .isLength({ min: 1, max: 50 })
    .withMessage("Category type must be between 1 and 50 characters"),

  validationError,
];

const validateUpdateCategory = [
  param("id")
    .exists()
    .withMessage("Category id is required")
    .bail()
    .isUUID()
    .withMessage("Category id must be a valid UUID"),

  body("name")
    .optional()
    .isString()
    .withMessage("Category name must be a string")
    .isLength({ min: 1, max: 100 })
    .withMessage("Category name must be between 1 and 100 characters"),

  body("type")
    .optional()
    .isString()
    .withMessage("Category type must be a string")
    .isLength({ min: 1, max: 50 })
    .withMessage("Category type must be between 1 and 50 characters"),

  validationError,
];

const validateCategoryId = [
  param("id")
    .exists()
    .withMessage("Category id is required")
    .bail()
    .isUUID()
    .withMessage("Category id must be a valid UUID"),

  validationError,
];

module.exports = {
  validateCreateCategory,
  validateUpdateCategory,
  validateCategoryId,
};
