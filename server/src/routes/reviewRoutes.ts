import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import {
  createReview,
  deleteReview,
  getReview,
  getAllReview,
  updateReview,
} from "../controllers/reviewController";

const router = Router();

// Collection Users
router.get("/review", getAllReview);
router.get("/review/:id", getReview);
router.post("/review", authenticateToken, createReview);
router.put("/review/:id", authenticateToken, updateReview);
router.delete("/review/:id", authenticateToken, deleteReview);

export default router;
