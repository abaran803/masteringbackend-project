const express = require("express");
const {
  createTag,
  getAllTag,
  getTagById,
  updateTag,
  deleteTag,
} = require("./controllers");
const {
  validateCreateTag,
  validateTagId,
  validateUpdateTag,
} = require("./validation");
const router = express.Router();

router.post("/", validateCreateTag, createTag);
router.get("/", getAllTag);
router.get("/:id", validateTagId, getTagById);
router.put("/:id", validateUpdateTag, updateTag);
router.delete("/:id", validateTagId, deleteTag);

module.exports = router;
