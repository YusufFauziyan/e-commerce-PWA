import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeAdmin } from "../middleware/roleMiddleware";
import {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";

const router = Router();

// Collection Categories
router.get("/category", authenticateToken, getAllCategories);
router.get("/category/:id", authenticateToken, getCategory);
router.post("/category", authenticateToken, authorizeAdmin, createCategory);
router.put("/category/:id", authenticateToken, authorizeAdmin, updateCategory);
router.delete(
  "/category/:id",
  authenticateToken,
  authorizeAdmin,
  deleteCategory
);

export default router;
