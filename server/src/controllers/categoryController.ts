// controllers/userController.ts
import { Request, Response } from "express";
import {
  createCategoryModel,
  deleteCategoryModel,
  getAllCategoryModel,
  getCategoryModel,
  updateCategoryModel,
} from "../models/categoryModel";

// Fetch all Category or the logged-in Category's data based on their role
export const getAllCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  const loggedInUser = (req as any).user;

  if (!loggedInUser) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const category = await getAllCategoryModel();

    res.status(200).json(category);
  } catch (error) {
    console.error("Error retrieving category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Category by id
export const getCategory = async (req: Request, res: Response) => {
  const id = req.params.id; // Mengambil id dari parameter URL
  try {
    const category = await getCategoryModel(id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    console.error("Error retrieving category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// create Category
export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: "Please provide name" });
    return;
  }

  try {
    const category = await createCategoryModel(req.body);

    res.status(201).json(category);
  } catch (error) {
    console.error("Error retrieving category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Edit category
export const updateCategory = async (req: Request, res: Response) => {
  const id = req.params.id; // Mengambil id dari parameter URL
  const body = req.body; // Mengambil data pengguna dari body request

  try {
    const cateogryExists = await getCategoryModel(id); // Fungsi untuk memeriksa apakah pengguna sudah ada di database
    if (!cateogryExists) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    const updateCategory = await updateCategoryModel(id, body);

    res.status(200).json(updateCategory); // Mengirimkan respons dengan status 200 dan data pengguna yang diupdate
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete category
export const deleteCategory = async (req: Request, res: Response) => {
  const id = req.params.id; // Mengambil id dari parameter URL

  try {
    const cateogryExists = await getCategoryModel(id);
    if (!cateogryExists) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    const deleted = await deleteCategoryModel(id);
    if (deleted) {
      res.status(200).json({ message: "Category deleted successfully" }); // Mengirimkan respons dengan status 200 jika pengguna berhasil dihapus
    } else {
      res.status(500).json({ message: "Error deleting address" }); // Mengirimkan respons dengan status 500 jika terjadi kesalahan saat menghapus pengguna
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
