const express = require("express");
const {
  createRecipe,
  getAllRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require("./controllers");
const router = express.Router();

router.post("/", createRecipe);
router.get("/", getAllRecipe);
router.get("/:id", getRecipeById);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;
