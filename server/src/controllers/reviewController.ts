// controllers/userController.ts
import { Request, Response } from "express";
import {
  createReviewModel,
  deleteReviewModel,
  getReviewModel,
  getAllReviewModel,
  updateReviewModel,
} from "../models/reviewModel";
import { getProductModel } from "../models/productModel";

// Fetch all Review or the logged-in Review's data based on their role
export const getAllReview = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { product_id } = req.query; // get query params

  try {
    const review = await getAllReviewModel(product_id as string);

    res.status(200).json(review);
  } catch (error) {
    console.error("Error retrieving review:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Review by id
export const getReview = async (req: Request, res: Response) => {
  const id = req.params.id; // Mengambil id dari parameter URL
  try {
    const review = await getReviewModel(id);
    if (review) {
      res.status(200).json(review);
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    console.error("Error retrieving review:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// create Review
export const createReview = async (req: Request, res: Response) => {
  const loggedInUser = (req as any).user;
  const { product_id } = req.body;

  if (!product_id) {
    res.status(400).json({ message: "product_id is required" });
    return;
  }

  try {
    // check if product exists
    const exitingProduct = await getProductModel(product_id);

    if (!exitingProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const review = await createReviewModel({
      ...req.body,
      user_id: loggedInUser.id,
    });

    res.status(201).json(review); // Mengirimkan respons dengan status 201 dan data pengguna yang ditambahkan
  } catch (error) {
    console.error("Error retrieving review:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Edit User
export const updateReview = async (req: Request, res: Response) => {
  const id = req.params.id; // Mengambil id dari parameter URL
  const review = req.body; // Mengambil data pengguna dari body request

  try {
    const reviewExists = await getReviewModel(id); // Fungsi untuk memeriksa apakah pengguna sudah ada di database
    if (!reviewExists) {
      res.status(404).json({ message: "Review not found" });
      return;
    }

    // check email exists
    const updateReview = await updateReviewModel(id, review);

    res.status(200).json(updateReview); // Mengirimkan respons dengan status 200 dan data pengguna yang diupdate
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  const id = req.params.id; // Mengambil id dari parameter URL

  try {
    const reviewExists = await getReviewModel(id); // Fungsi untuk memeriksa apakah pengguna sudah ada di database
    if (!reviewExists) {
      res.status(404).json({ message: "Review not found" });
      return;
    }

    const deleted = await deleteReviewModel(id); // Fungsi untuk menghapus data pengguna berdasarkan id
    if (deleted) {
      res.status(200).json({ message: "Review deleted successfully" }); // Mengirimkan respons dengan status 200 jika pengguna berhasil dihapus
    } else {
      res.status(500).json({ message: "Error deleting review" }); // Mengirimkan respons dengan status 500 jika terjadi kesalahan saat menghapus pengguna
    }
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
