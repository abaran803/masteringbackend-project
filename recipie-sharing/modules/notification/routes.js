const express = require("express");
const {
  // createNotification,
  getAllNotification,
  getNotificationById,
  updateNotification,
  deleteNotification,
} = require("./controllers");
const router = express.Router();

const {
  // validateCreateNotification,
  validateUpdateNotification,
  validateNotificationId,
} = require("./validation");

// router.post("/", validateCreateNotification, createNotification);
router.get("/", getAllNotification);
router.get("/:id", validateNotificationId, getNotificationById);
router.put("/:id", validateUpdateNotification, updateNotification);
router.delete("/:id", validateNotificationId, deleteNotification);

module.exports = router;
