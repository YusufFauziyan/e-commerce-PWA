import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import {
  createOrder,
  deleteOrder,
  getOrder,
  getAllOrder,
  updateOrder,
} from "../controllers/orderController";
import { authorizeAdmin } from "../middleware/roleMiddleware";

const router = Router();

// Collection Users
router.get("/order", authenticateToken, getAllOrder);
router.get("/order/:id", authenticateToken, getOrder);
router.post("/order", authenticateToken, createOrder);
router.put("/order/:id", authenticateToken, updateOrder);
router.delete("/order/:id", authenticateToken, authorizeAdmin, deleteOrder);

export default router;
