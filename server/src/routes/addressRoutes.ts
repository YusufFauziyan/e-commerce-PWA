import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import {
  createAddress,
  deleteAddress,
  getAddress,
  getAllAddress,
  updateAddress,
} from "../controllers/addressController";

const router = Router();

// Collection Users
router.get("/address", authenticateToken, getAllAddress);
router.get("/address/:id", authenticateToken, getAddress);
router.post("/address", authenticateToken, createAddress);
router.put("/address/:id", authenticateToken, updateAddress);
router.delete("/address/:id", authenticateToken, deleteAddress);

export default router;
