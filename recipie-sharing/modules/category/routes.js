const express = require("express");
const {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("./controllers");
const router = express.Router();

router.post("/", createCategory);
router.get("/", getAllCategory);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
