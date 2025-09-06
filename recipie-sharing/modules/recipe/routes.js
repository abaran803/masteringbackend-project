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

const {
  validateCreateRecipe,
  validateUpdateRecipe,
  validateRecipeId,
  validateAddComment,
  validateAddRating,
  validateAddTag,
  validateAddCategories,
} = require("./validation");

router.post(
  "/",
  upload.array("photos"),
  uploadFile,
  validateCreateRecipe,
  createRecipe
);
router.get("/", getAllRecipe);
router.get("/:id", validateRecipeId, getRecipeById);
router.put("/:id", validateUpdateRecipe, updateRecipe);
router.delete("/:id", validateRecipeId, deleteRecipe);

router.post("/mark-favourite/:id", validateRecipeId, markFavourite);
router.post("/add-comment/:id", validateAddComment, addComment);
router.post("/add-rating/:id", validateAddRating, addRating);
router.post("/add-tag/:id", validateAddTag, addTag);
router.post("/add-tag/:id/:tag_id", validateAddTag, addTag);
router.post("/add-categories/:id", validateAddCategories, addCategories);

module.exports = router;
