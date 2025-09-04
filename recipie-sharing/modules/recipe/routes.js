const express = require("express");
const {
  createRecipe,
  getAllRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require("./controllers");
const router = express.Router();
const multer = require("multer");
const uploadFile = require("../../middleware/uploadFile");

const upload = multer({ dest: "uploads/" });

router.post("/", upload.array("photos"), uploadFile, createRecipe);
router.get("/", getAllRecipe);
router.get("/:id", getRecipeById);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;
