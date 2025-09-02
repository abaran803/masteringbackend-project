const express = require("express");
const {
  createComment,
  getAllComment,
  getCommentById,
  updateComment,
  deleteComment,
} = require("./controllers");
const router = express.Router();

router.post("/", createComment);
router.get("/", getAllComment);
router.get("/:id", getCommentById);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;
