const express = require("express");
const {
  createRecipe,
  getAllRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  markFavourite,
  addComment,
  addRating,
  addTag,
  addCategories,
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

router.post("/mark-favourite/:id", markFavourite);
router.post("/add-comment/:id", addComment);
router.post("/add-rating/:id", addRating);
router.post("/add-tag/:id", addTag);
router.post("/add-tag/:id/:tag_id", addTag);
router.post("/add-categories/:id", addCategories);

module.exports = router;
