import User from "./User.js";
import Store from "./Store.js";
import Rating from "./Rating.js";

// User -> Store
User.hasMany(Store, {
  foreignKey: "ownerId",
  as: "ownedStores",
});


Store.belongsTo(User, {
  foreignKey: "ownerId",
  as: "owner",
});


// User -> Rating
User.hasMany(Rating, {
  foreignKey: "userId",
  as: "ratings",
});

Rating.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Store -> Rating
Store.hasMany(Rating, {
  foreignKey: "storeId",
  as: "ratings",
});

Rating.belongsTo(Store, {
  foreignKey: "storeId",
  as: "store",
});

export {
  User,
  Store,
  Rating,
};