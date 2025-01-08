import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import {
  createShipping,
  deleteShipping,
  getShipping,
  getAllShipping,
  updateShipping,
} from "../controllers/shippingController";

const router = Router();

// Collection Users
router.get("/shipping", authenticateToken, getAllShipping);
router.get("/shipping/:id", authenticateToken, getShipping);
router.post("/shipping", authenticateToken, createShipping);
router.put("/shipping/:id", authenticateToken, updateShipping);
router.delete("/shipping/:id", authenticateToken, deleteShipping);

export default router;
