import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeAdmin, authorizeSeller } from "../middleware/roleMiddleware";
import {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
} from "../controllers/productController";

const router = Router();

// Collection Categories
router.get("/product", authenticateToken, getAllProduct);
router.get("/product/:id", authenticateToken, getProduct);
router.post("/product", authenticateToken, authorizeSeller, createProduct);
router.put("/product/:id", authenticateToken, authorizeSeller, updateProduct);
router.delete(
  "/product/:id",
  authenticateToken,
  authorizeSeller,
  deleteProduct
);

export default router;
