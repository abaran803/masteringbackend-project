const { body, param } = require("express-validator");
const { validationError } = require("../../middleware/validationError");

const validateCreateIngredient = [
  body("name")
    .exists()
    .withMessage("Ingredient name is required")
    .bail()
    .isString()
    .withMessage("Ingredient name must be a string")
    .isLength({ min: 1, max: 100 })
    .withMessage("Ingredient name must be between 1 and 100 characters"),

  validationError,
];

const validateUpdateIngredient = [
  param("id")
    .exists()
    .withMessage("Ingredient id is required")
    .bail()
    .isUUID()
    .withMessage("Ingredient id must be a valid UUID"),

  body("name")
    .exists()
    .withMessage("Ingredient name is required")
    .bail()
    .isString()
    .withMessage("Ingredient name must be a string")
    .isLength({ min: 1, max: 100 })
    .withMessage("Ingredient name must be between 1 and 100 characters"),

  validationError,
];

const validateIngredientId = [
  param("id")
    .exists()
    .withMessage("Ingredient id is required")
    .bail()
    .isUUID()
    .withMessage("Ingredient id must be a valid UUID"),

  validationError,
];

module.exports = {
  validateCreateIngredient,
  validateUpdateIngredient,
  validateIngredientId,
};
