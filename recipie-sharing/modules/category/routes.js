const express = require("express");
const {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("./controllers");
const router = express.Router();
const {
  validateCreateCategory,
  validateUpdateCategory,
  validateCategoryId,
} = require("./validation");

router.post("/", validateCreateCategory, createCategory);
router.get("/", getAllCategory);
router.get("/:id", validateCategoryId, getCategoryById);
router.put("/:id", validateUpdateCategory, updateCategory);
router.delete("/:id", validateCategoryId, deleteCategory);

module.exports = router;
