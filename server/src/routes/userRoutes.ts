import { Router } from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByToken,
} from "../controllers/userController";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeAdmin } from "../middleware/roleMiddleware";
import { uploadMiddleware } from "../middleware/uploadMiddleware";

const router = Router();

// Collection Users
router.get("/users", authenticateToken, getAllUsers);
router.get("/user/me", authenticateToken, getUserByToken);
router.get("/user/:id", getUser);
router.post("/user", createUser);
router.put("/user/:id", authenticateToken, uploadMiddleware, updateUser);
router.delete("/user/:id", authenticateToken, authorizeAdmin, deleteUser);

export default router;
