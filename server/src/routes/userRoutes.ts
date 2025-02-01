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

const router = Router();

// Collection Users
router.get("/users", authenticateToken, getAllUsers);
router.get("/user/me", authenticateToken, getUserByToken);
router.get("/user/:id", authenticateToken, authorizeAdmin, getUser);
router.post("/user", createUser);
router.put("/user/:id", authenticateToken, updateUser);
router.delete("/user/:id", authenticateToken, authorizeAdmin, deleteUser);

export default router;
