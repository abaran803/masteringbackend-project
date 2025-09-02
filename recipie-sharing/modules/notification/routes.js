const express = require("express");
const {
  createNotification,
  getAllNotification,
  getNotificationById,
  updateNotification,
  deleteNotification,
} = require("./controllers");
const router = express.Router();

router.post("/", createNotification);
router.get("/", getAllNotification);
router.get("/:id", getNotificationById);
router.put("/:id", updateNotification);
router.delete("/:id", deleteNotification);

module.exports = router;
