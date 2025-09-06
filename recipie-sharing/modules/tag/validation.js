const { body, param } = require("express-validator");
const { validationError } = require("../../middleware/validationError");

const validateCreateTag = [
  body("name")
    .exists()
    .withMessage("Tag name is required")
    .bail()
    .isString()
    .withMessage("Tag name must be a string")
    .bail()
    .isLength({ min: 1, max: 100 })
    .withMessage("Tag name must be between 1 and 100 characters"),

  validationError,
];

const validateUpdateTag = [
  param("id")
    .exists()
    .withMessage("Tag id is required")
    .bail()
    .isUUID()
    .withMessage("Tag id must be a valid UUID"),

  body("name")
    .exists()
    .withMessage("Tag name is required")
    .bail()
    .isString()
    .withMessage("Tag name must be a string")
    .bail()
    .isLength({ min: 1, max: 100 })
    .withMessage("Tag name must be between 1 and 100 characters"),

  validationError,
];

const validateTagId = [
  param("id")
    .exists()
    .withMessage("Tag id is required")
    .bail()
    .isUUID()
    .withMessage("Tag id must be a valid UUID"),

  validationError,
];

module.exports = {
  validateCreateTag,
  validateUpdateTag,
  validateTagId,
};
