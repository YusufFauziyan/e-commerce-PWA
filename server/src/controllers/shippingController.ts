// controllers/userController.ts
import { Request, Response } from "express";
import {
  createShippingModel,
  deleteShippingModel,
  getShippingModel,
  getAllShippingModel,
  updateShippingModel,
} from "../models/shippingModel";
import { getOrderModel } from "../models/orderModel";
import { getAddressModel } from "../models/addressModel";

// Fetch all Shipping or the logged-in Shipping's data based on their role
export const getAllShipping = async (
  req: Request,
  res: Response
): Promise<void> => {
  const loggedInUser = (req as any).user;

  if (!loggedInUser) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const shipping = await getAllShippingModel(
      loggedInUser.id,
      loggedInUser.role
    );

    res.status(200).json(shipping);
  } catch (error) {
    console.error("Error retrieving shipping:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Shipping by id
export const getShipping = async (req: Request, res: Response) => {
  const id = req.params.id; // Mengambil id dari parameter URL
  try {
    const shipping = await getShippingModel(id);
    if (shipping) {
      res.status(200).json(shipping);
    } else {
      res.status(404).json({ message: "Shipping not found" });
    }
  } catch (error) {
    console.error("Error retrieving shipping:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// create Shipping
export const createShipping = async (req: Request, res: Response) => {
  const loggedInUser = (req as any).user;
  const { order_id, address_id } = req.body;

  if (!loggedInUser) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (!order_id || !address_id) {
    res.status(400).json({ message: "Please fill all required fields" });
    return;
  }

  try {
    // check if order exists
    const existingOrder = await getOrderModel(order_id);

    if (!existingOrder) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    // check if address exists
    const existingAddress = await getAddressModel(address_id);

    if (!existingAddress) {
      res.status(404).json({ message: "Address not found" });
      return;
    }

    // check if user exists
    const shipping = await createShippingModel({
      ...req.body,
      user_id: loggedInUser.id,
    });

    res.status(201).json(shipping); // Mengirimkan respons dengan status 201 dan data pengguna yang ditambahkan
  } catch (error) {
    console.error("Error retrieving shipping:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Edit User
export const updateShipping = async (req: Request, res: Response) => {
  const id = req.params.id; // Mengambil id dari parameter URL
  const shipping = req.body; // Mengambil data pengguna dari body request

  try {
    const shippingExists = await getShippingModel(id); // Fungsi untuk memeriksa apakah pengguna sudah ada di database
    if (!shippingExists) {
      res.status(404).json({ message: "Shipping not found" });
      return;
    }

    // check email exists
    const updateShipping = await updateShippingModel(id, shipping);

    res.status(200).json(updateShipping); // Mengirimkan respons dengan status 200 dan data pengguna yang diupdate
  } catch (error) {
    console.error("Error updating shipping:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteShipping = async (req: Request, res: Response) => {
  const id = req.params.id; // Mengambil id dari parameter URL

  try {
    const shippingExists = await getShippingModel(id); // Fungsi untuk memeriksa apakah pengguna sudah ada di database
    if (!shippingExists) {
      res.status(404).json({ message: "Shipping not found" });
      return;
    }

    const deleted = await deleteShippingModel(id); // Fungsi untuk menghapus data pengguna berdasarkan id
    if (deleted) {
      res.status(200).json({ message: "Shipping deleted successfully" }); // Mengirimkan respons dengan status 200 jika pengguna berhasil dihapus
    } else {
      res.status(500).json({ message: "Error deleting shipping" }); // Mengirimkan respons dengan status 500 jika terjadi kesalahan saat menghapus pengguna
    }
  } catch (error) {
    console.error("Error deleting shipping:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
