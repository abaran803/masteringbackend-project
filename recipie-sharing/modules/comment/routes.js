const express = require("express");
const {
  createComment,
  getAllComment,
  getCommentById,
  updateComment,
  deleteComment,
} = require("./controllers");
const router = express.Router();

const {
  validateCreateComment,
  validateUpdateComment,
  validateCommentId,
} = require("./validation");

router.post("/", validateCreateComment, createComment);
router.get("/", getAllComment);
router.get("/:id", validateCommentId, getCommentById);
router.put("/:id", validateUpdateComment, updateComment);
router.delete("/:id", validateCommentId, deleteComment);

module.exports = router;
