import express from "express";
import {
  getAllUsers,
  approveUser,
  banUser,
} from "../controllers/userController.js";

import { authorization } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", authorization, getAllUsers); // View all users
router.post("/approve/:id", authorization, approveUser); // Approve user
router.post("/ban/:id", authorization, banUser); // Ban user

export default router;
