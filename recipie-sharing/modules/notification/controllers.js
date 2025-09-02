const db = require("../../model");

const Notification = db.notifications;

const createNotification = async (req, res, next) => {
  try {
    const { type, message } = req.body;
    if (!type || !message) {
      return res.status(400).send({
        message: "Type and message is required",
      });
    }
    await Notification.create({
      message,
      type,
      user_id: req.user_id,
    });
    res.status(200).send({
      message: "Notification Created",
    });
  } catch (err) {
    next(err);
  }
};

const getAllNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findAll();
    res.status(200).send({
      message: "Fetched notification suuccessfully",
      data: notification,
    });
  } catch (err) {
    next(err);
  }
};

const getNotificationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let notification = await Notification.findOne({
      where: {
        id,
      },
    });
    res.status(200).send({
      message: "Fetched notification successfully",
      data: notification,
    });
  } catch (err) {
    next(err);
  }
};

const updateNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const notificationData = req.body;
    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).send({
        message: "Notification not found",
      });
    }
    await notification.update(notificationData);
    res.status(200).send({
      message: "Notification updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const deleteNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).send({
        message: "Notification not found",
      });
    }
    await notification.destroy();
    res.status(200).send({
      message: "Notification deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createNotification,
  getAllNotification,
  getNotificationById,
  updateNotification,
  deleteNotification,
};
