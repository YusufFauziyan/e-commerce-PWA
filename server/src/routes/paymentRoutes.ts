import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import {
  createPayment,
  getPayment,
  getAllPayment,
  paymentNotification,
} from "../controllers/paymentController";

const router = Router();

// Collection Users
router.get("/payment", authenticateToken, getAllPayment);
router.get("/payment/:id", authenticateToken, getPayment);
router.post("/payment", authenticateToken, createPayment);
router.post("/payment/notification", paymentNotification); //triggered by midtrans

export default router;
