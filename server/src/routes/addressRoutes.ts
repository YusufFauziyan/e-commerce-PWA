import { Router } from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeAdmin } from "../middleware/roleMiddleware";

const router = Router();

// Collection Users
router.get("/address", authenticateToken, getAllUsers);
router.get("/address/:id", authenticateToken, authorizeAdmin, getUser);
router.post("/address", createUser);
router.put("/address/:id", authenticateToken, authorizeAdmin, updateUser);
router.delete("/address/:id", authenticateToken, authorizeAdmin, deleteUser);

export default router;
