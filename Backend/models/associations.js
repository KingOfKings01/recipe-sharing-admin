import User from "./User.js";
import Recipe from "./Recipe.js";

// Define associations
export default function setupAssociations() {
  // User has many Recipes
  User.hasMany(Recipe, { foreignKey: "userId" });
  Recipe.belongsTo(User, { foreignKey: "userId" });
}
