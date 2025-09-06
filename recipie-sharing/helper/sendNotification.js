module.exports = async (recipeId, userId, db, action, operation) => {
  const type = "info";
  const recipe = await db.recipes.findByPk(recipeId, {
    include: [
      {
        model: db.users,
        as: "FavouritedBy",
      },
      { model: db.users, as: "creater" },
    ],
  });
  const commenter = await db.users.findByPk(userId);
  const { creater, FavouritedBy, title } = recipe;
  FavouritedBy.forEach((fav) => {
    db.notifications.create({
      message: `New ${action} ${operation} by ${commenter.username} in ${title} recipe`,
      type,
      user_id: fav.id,
    });
  });
  db.notifications.create({
    message: `New ${action} ${operation} by ${commenter.username} in ${title} recipe`,
    type,
    user_id: creater.id,
  });
};
