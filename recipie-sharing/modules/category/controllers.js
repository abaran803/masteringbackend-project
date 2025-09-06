const db = require("../../models");

const Category = db.categories;

const createCategory = async (req, res, next) => {
  try {
    const { name, type } = req.body;
    if (!name || !type) {
      return res.status(400).send({
        message: "Name and type by is required",
      });
    }
    const matchingCategory = await Category.findOne({
      where: {
        name,
        type,
      },
    });
    if (matchingCategory) {
      return res.status(409).send({
        message: "Category already exist",
      });
    }
    await Category.create({ name, type });
    res.status(200).send({
      message: "Category Created",
    });
  } catch (err) {
    next(err);
  }
};

const getAllCategory = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.status(200).send({
      message: "Fetched categories suuccessfully",
      data: categories,
    });
  } catch (err) {
    next(err);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let category = await Category.findByPk(id)
    res.status(200).send({
      message: "Fetched category successfully",
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categoryData = req.body;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).send({
        message: "Category not found",
      });
    }
    await category.update(categoryData);
    res.status(200).send({
      message: "Category updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).send({
        message: "Category not found",
      });
    }
    await category.destroy();
    res.status(200).send({
      message: "Category deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
