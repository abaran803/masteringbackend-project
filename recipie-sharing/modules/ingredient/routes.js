const express = require("express");
const {
  createIngredient,
  getAllIngredients,
  getIngredientById,
  updateIngredient,
  deleteIngredient,
} = require("./controllers");
const router = express.Router();
const {
  validateCreateIngredient,
  validateUpdateIngredient,
  validateIngredientId,
} = require("./validation");

router.post("/", validateCreateIngredient, createIngredient);
router.get("/", getAllIngredients);
router.get("/:id", validateIngredientId, getIngredientById);
router.put("/:id", validateUpdateIngredient, updateIngredient);
router.delete("/:id", validateIngredientId, deleteIngredient);

module.exports = router;
