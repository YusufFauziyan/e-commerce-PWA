import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import {
  createCart,
  deleteCart,
  getCart,
  getAllCart,
  updateCart,
  getTotalCart,
} from "../controllers/cartController";

const router = Router();

// Collection Users
router.get("/cart", authenticateToken, getAllCart);
router.get("/cart/total", authenticateToken, getTotalCart);
router.get("/cart/:id", authenticateToken, getCart);
router.post("/cart", authenticateToken, createCart);
router.put("/cart/:id", authenticateToken, updateCart);
router.delete("/cart/:id", authenticateToken, deleteCart);

export default router;
