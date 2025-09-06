const { body, param } = require("express-validator");
const { validationError } = require("../../middleware/validationError");

const validateSignup = [
  body("username")
    .exists()
    .withMessage("Username is required")
    .bail()
    .isString()
    .withMessage("Username must be a string")
    .bail()
    .isLength({ min: 3, max: 50 })
    .withMessage("Username must be between 3 and 50 characters"),

  body("email")
    .exists()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .isString()
    .withMessage("Password must be a string")
    .bail()
    .isLength({ min: 6, max: 128 })
    .withMessage("Password must be between 6 and 128 characters"),

  validationError,
];

const validateSignin = [
  body("username").exists().withMessage("Username is required"),

  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .isString()
    .withMessage("Password must be a string")
    .bail()
    .isLength({ min: 6, max: 128 })
    .withMessage("Password must be between 6 and 128 characters"),

  validationError,
];

const validateFollow = [
  param("id")
    .exists()
    .withMessage("User id is required")
    .bail()
    .isUUID()
    .withMessage("User id must be a valid UUID"),

  validationError,
];

module.exports = {
  validateSignup,
  validateSignin,
  validateFollow,
};
