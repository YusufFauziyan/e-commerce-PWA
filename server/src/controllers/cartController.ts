// controllers/userController.ts
import { Request, Response } from "express";
import {
  createCartModel,
  deleteCartModel,
  getCartModel,
  getAllCartModel,
  updateCartModel,
} from "../models/cartModel";
import { getProductModel } from "../models/productModel";

// Fetch all Cart or the logged-in Cart's data based on their role
export const getAllCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  const loggedInUser = (req as any).user;

  if (!loggedInUser) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const cart = await getAllCartModel(loggedInUser.id, loggedInUser.role);

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error retrieving cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Cart by id
export const getCart = async (req: Request, res: Response) => {
  const id = req.params.id; // Mengambil id dari parameter URL
  try {
    const cart = await getCartModel(id);
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error("Error retrieving cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// create Cart
export const createCart = async (req: Request, res: Response) => {
  const loggedInUser = (req as any).user;
  const { product_id } = req.body;

  if (!product_id) {
    res.status(400).json({ message: "prouct_id is required" });
  }

  try {
    // check product available
    const product = await getProductModel(product_id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const cart = await createCartModel({
      ...req.body,
      user_id: loggedInUser.id,
    });

    res.status(201).json(cart); // Mengirimkan respons dengan status 201 dan data pengguna yang ditambahkan
  } catch (error) {
    console.error("Error retrieving cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Edit User
export const updateCart = async (req: Request, res: Response) => {
  const id = req.params.id; // Mengambil id dari parameter URL
  const cart = req.body; // Mengambil data pengguna dari body request

  try {
    const cartExists = await getCartModel(id); // Fungsi untuk memeriksa apakah pengguna sudah ada di database
    if (!cartExists) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    // check email exists
    const updateCart = await updateCartModel(id, cart);

    res.status(200).json(updateCart); // Mengirimkan respons dengan status 200 dan data pengguna yang diupdate
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteCart = async (req: Request, res: Response) => {
  const id = req.params.id; // Mengambil id dari parameter URL

  try {
    const cartExists = await getCartModel(id); // Fungsi untuk memeriksa apakah pengguna sudah ada di database
    if (!cartExists) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    const deleted = await deleteCartModel(id); // Fungsi untuk menghapus data pengguna berdasarkan id
    if (deleted) {
      res.status(200).json({ message: "Cart deleted successfully" }); // Mengirimkan respons dengan status 200 jika pengguna berhasil dihapus
    } else {
      res.status(500).json({ message: "Error deleting cart" }); // Mengirimkan respons dengan status 500 jika terjadi kesalahan saat menghapus pengguna
    }
  } catch (error) {
    console.error("Error deleting cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
