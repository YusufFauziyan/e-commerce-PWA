// controllers/userController.ts
import { Request, Response } from "express";
import {
  createCategoryModel,
  deleteCategoryModel,
  getAllCategoryModel,
  getCategoryModel,
  updateCategoryModel,
} from "../models/categoryModel";
import {
  createProductModel,
  deleteProductModel,
  getAllProductModel,
  getProductModel,
  updateProductModel,
} from "../models/productModel";

// Fetch all Product or the logged-in Product's data based on their role
export const getAllProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const loggedInUser = (req as any).user;

  if (!loggedInUser) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const products = await getAllProductModel(loggedInUser.id);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error retrieving category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Product by id
export const getProduct = async (req: Request, res: Response) => {
  const id = req.params.id; // Mengambil id dari parameter URL
  try {
    const product = await getProductModel(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error retrieving product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// create product
export const createProduct = async (req: Request, res: Response) => {
  const loggedInUser = (req as any).user;
  const { name, price, stock_quantity } = req.body;

  if (!loggedInUser) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (!name || !price || !stock_quantity) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  const body = {
    ...req.body,
    user_id: loggedInUser.id,
  };

  try {
    const product = await createProductModel(body);

    res.status(201).json(product);
  } catch (error) {
    console.error("Error retrieving product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Edit product
export const updateProduct = async (req: Request, res: Response) => {
  const id = req.params.id; // Mengambil id dari parameter URL
  const body = req.body; // Mengambil data pengguna dari body request

  try {
    const productExists = await getProductModel(id); // Fungsi untuk memeriksa apakah pengguna sudah ada di database
    if (!productExists) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const updateProduct = await updateProductModel(id, body);

    res.status(200).json(updateProduct); // Mengirimkan respons dengan status 200 dan data pengguna yang diupdate
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete product
export const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id; // Mengambil id dari parameter URL

  try {
    const productExists = await getProductModel(id);
    if (!productExists) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const deleted = await deleteProductModel(id);
    if (deleted) {
      res.status(200).json({ message: "Product deleted successfully" }); // Mengirimkan respons dengan status 200 jika pengguna berhasil dihapus
    } else {
      res.status(500).json({ message: "Error deleting address" }); // Mengirimkan respons dengan status 500 jika terjadi kesalahan saat menghapus pengguna
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
