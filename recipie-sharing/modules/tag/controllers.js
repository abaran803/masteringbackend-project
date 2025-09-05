const db = require("../../models");

const Tag = db.tags;

const createTag = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({
        message: "Tag name by is required",
      });
    }
    const matchingTag = await Tag.findOne({
      where: {
        name,
      },
    });
    if (matchingTag) {
      return res.status(409).send({
        message: "Tag already exist",
      });
    }
    await Tag.create({ name });
    res.status(200).send({
      message: "Tag Created",
    });
  } catch (err) {
    next(err);
  }
};

const getAllTag = async (req, res, next) => {
  try {
    const tags = await Tag.findAll();
    res.status(200).send({
      message: "Fetched tags successfully",
      data: tags,
    });
  } catch (err) {
    next(err);
  }
};

const getTagById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findOne({
      where: {
        id,
      },
    });
    res.status(200).send({
      message: "Fetched tag successfully",
      data: tag,
    });
  } catch (err) {
    next(err);
  }
};

const updateTag = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tagData = req.body;
    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).send({
        message: "Tag not found",
      });
    }
    await tag.update(tagData);
    res.status(200).send({
      message: "Tag updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const deleteTag = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).send({
        message: "Tag not found",
      });
    }
    await tag.destroy();
    res.status(200).send({
      message: "Tag deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createTag,
  getAllTag,
  getTagById,
  updateTag,
  deleteTag,
};
