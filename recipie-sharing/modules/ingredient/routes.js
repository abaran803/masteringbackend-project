const express = require("express");
const {
  createIngredient,
  getAllIngredients,
  getIngredientById,
  updateIngredient,
  deleteIngredient,
} = require("./controllers");
const router = express.Router();

router.post("/", createIngredient);
router.get("/", getAllIngredients);
router.get("/:id", getIngredientById);
router.put("/:id", updateIngredient);
router.delete("/:id", deleteIngredient);

module.exports = router;
