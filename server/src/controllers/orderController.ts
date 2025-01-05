// controllers/userController.ts
import { Request, Response } from "express";
import {
  createOrderModel,
  deleteOrderModel,
  getOrderModel,
  getAllOrderModel,
  updateOrderModel,
} from "../models/orderModel";
import { getAddressModel } from "../models/addressModel";

// Fetch all Order or the logged-in Order's data based on their role
export const getAllOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const loggedInUser = (req as any).user;

  if (!loggedInUser) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const order = await getAllOrderModel(loggedInUser.id, loggedInUser.role);

    res.status(200).json(order);
  } catch (error) {
    console.error("Error retrieving order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Order by id
export const getOrder = async (req: Request, res: Response) => {
  const loggedInUser = (req as any).user;
  const id = req.params.id; // Mengambil id dari parameter URL

  if (!loggedInUser) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const order = await getOrderModel(id);
    if (order) {
      if (order.user_id !== loggedInUser.id && loggedInUser.role !== "admin") {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error("Error retrieving order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// create Order
export const createOrder = async (req: Request, res: Response) => {
  const loggedInUser = (req as any).user;
  const { address_id } = req.body;

  if (!address_id) {
    res.status(400).json({ message: "address_id is required" });
  }

  try {
    // check address available
    const address = await getAddressModel(address_id);

    if (!address) {
      res.status(404).json({ message: "Address not found" });
      return;
    }

    const order = await createOrderModel({
      ...req.body,
      user_id: loggedInUser.id,
    });

    res.status(201).json(order); // Mengirimkan respons dengan status 201 dan data pengguna yang ditambahkan
  } catch (error) {
    console.error("Error retrieving order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Edit User
export const updateOrder = async (req: Request, res: Response) => {
  const id = req.params.id; // Mengambil id dari parameter URL

  try {
    const orderExists = await getOrderModel(id); // Fungsi untuk memeriksa apakah pengguna sudah ada di database
    if (!orderExists) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    // check email exists
    const updateOrder = await updateOrderModel(id, req.body);

    res.status(200).json(updateOrder); // Mengirimkan respons dengan status 200 dan data pengguna yang diupdate
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  const id = req.params.id; // Mengambil id dari parameter URL

  try {
    const orderExists = await getOrderModel(id); // Fungsi untuk memeriksa apakah pengguna sudah ada di database
    if (!orderExists) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    const deleted = await deleteOrderModel(id); // Fungsi untuk menghapus data pengguna berdasarkan id
    if (deleted) {
      res.status(200).json({ message: "Order deleted successfully" }); // Mengirimkan respons dengan status 200 jika pengguna berhasil dihapus
    } else {
      res.status(500).json({ message: "Error deleting order" }); // Mengirimkan respons dengan status 500 jika terjadi kesalahan saat menghapus pengguna
    }
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
