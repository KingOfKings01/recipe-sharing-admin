import "dotenv/config";
import express from "express";
import sequelize from "./config/database.js";
import userRoutes from "./routes/userRoutes.js"; // User management routes
import recipeRoutes from "./routes/recipeRoutes.js"; // Recipe management routes
import authRoutes from "./routes/authRoutes.js"; // Recipe management routes
import cors from "cors";

// associations
import setupAssociations from "./models/associations.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.SITE_URL,
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Admin routes
app.use("/admin/auth", authRoutes);
app.use("/admin/users", userRoutes);
app.use("/admin/recipes", recipeRoutes);

// Database Sync
async function initializeDatabase() {
  console.log("Database connection has been established successfully.");
  await sequelize.sync({ force: false });
  //   await sequelize.sync({ force: true });
}

setupAssociations();
initializeDatabase();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Admin server running on port ${PORT}`);
});
