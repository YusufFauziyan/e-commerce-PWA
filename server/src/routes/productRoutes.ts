import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeSeller } from "../middleware/roleMiddleware";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
} from "../controllers/productController";
import {
  uploadMiddleware,
  uploadMultipleMiddleware,
} from "../middleware/uploadMiddleware";

const router = Router();

// Collection Categories
router.get("/product", authenticateToken, getAllProduct);
router.get("/product/:id", authenticateToken, getProduct);
router.post(
  "/product",
  authenticateToken,
  authorizeSeller,
  uploadMultipleMiddleware,
  createProduct
);
router.put(
  "/product/:id",
  authenticateToken,
  authorizeSeller,
  uploadMultipleMiddleware,
  updateProduct
);
router.delete(
  "/product/:id",
  authenticateToken,
  authorizeSeller,
  deleteProduct
);

// router.post("/product/upload", uploadMiddleware, uploadImage);
// router.post(
//   "/product/upload-multiple",
//   uploadMultipleMiddleware,
//   uploadMultipleImages
// );

export default router;
