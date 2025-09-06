const { body, param } = require("express-validator");
const { validationError } = require("../../middleware/validationError");

// const validateCreateNotification = [
//   body("user_id")
//     .exists()
//     .withMessage("User id is required")
//     .bail()
//     .isUUID()
//     .withMessage("User id must be a valid UUID"),

//   body("type")
//     .exists()
//     .withMessage("Notification type is required")
//     .bail()
//     .isString()
//     .withMessage("Notification type must be a string")
//     .isLength({ min: 3, max: 50 })
//     .withMessage("Notification type must be between 3 and 50 characters"),

//   body("message")
//     .exists()
//     .withMessage("Notification message is required")
//     .bail()
//     .isString()
//     .withMessage("Notification message must be a string")
//     .isLength({ min: 1, max: 255 })
//     .withMessage("Notification message must be between 1 and 255 characters"),

//   body("is_read")
//     .optional()
//     .isBoolean()
//     .withMessage("is_read must be true or false"),
// ];

const validateUpdateNotification = [
  param("id")
    .exists()
    .withMessage("Notification id is required")
    .bail()
    .isUUID()
    .withMessage("Notification id must be a valid UUID"),

  body("user_id")
    .optional()
    .isUUID()
    .withMessage("User id must be a valid UUID"),

  body("type")
    .optional()
    .isString()
    .withMessage("Notification type must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("Notification type must be between 3 and 50 characters"),

  body("message")
    .optional()
    .isString()
    .withMessage("Notification message must be a string")
    .isLength({ min: 1, max: 255 })
    .withMessage("Notification message must be between 1 and 255 characters"),

  body("is_read")
    .optional()
    .isBoolean()
    .withMessage("is_read must be true or false"),

  validationError,
];

const validateNotificationId = [
  param("id")
    .exists()
    .withMessage("Notification id is required")
    .bail()
    .isUUID()
    .withMessage("Notification id must be a valid UUID"),

  validationError,
];

module.exports = {
  // validateCreateNotification,
  validateUpdateNotification,
  validateNotificationId,
};
