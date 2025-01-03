// controllers/userController.ts
import { Request, Response } from "express";
import {
  createAddressModel,
  deleteAddressModel,
  getAddressModel,
  getAllAddressModel,
  updateAddressModel,
} from "../models/addressModel";

// Fetch all Address or the logged-in Address's data based on their role
export const getAllAddress = async (
  req: Request,
  res: Response
): Promise<void> => {
  const loggedInUser = (req as any).user;

  if (!loggedInUser) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const address = await getAllAddressModel(
      loggedInUser.id,
      loggedInUser.role
    );

    res.status(200).json(address);
  } catch (error) {
    console.error("Error retrieving address:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Address by id
export const getAddress = async (req: Request, res: Response) => {
  const id = req.params.id; // Mengambil id dari parameter URL
  try {
    const address = await getAddressModel(id);
    if (address) {
      res.status(200).json(address);
    } else {
      res.status(404).json({ message: "Address not found" });
    }
  } catch (error) {
    console.error("Error retrieving address:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// create Address
export const createAddress = async (req: Request, res: Response) => {
  const loggedInUser = (req as any).user;
  const body = req.body;

  try {
    // check if user exists
    const address = await createAddressModel({
      ...body,
      user_id: loggedInUser.id,
    });

    res.status(201).json(address); // Mengirimkan respons dengan status 201 dan data pengguna yang ditambahkan
  } catch (error) {
    console.error("Error retrieving address:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Edit User
export const updateAddress = async (req: Request, res: Response) => {
  const id = req.params.id; // Mengambil id dari parameter URL
  const address = req.body; // Mengambil data pengguna dari body request

  try {
    const addressExists = await getAddressModel(id); // Fungsi untuk memeriksa apakah pengguna sudah ada di database
    if (!addressExists) {
      res.status(404).json({ message: "Address not found" });
      return;
    }

    // check email exists
    const updateAddress = await updateAddressModel(id, address);

    res.status(200).json(updateAddress); // Mengirimkan respons dengan status 200 dan data pengguna yang diupdate
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteAddress = async (req: Request, res: Response) => {
  const id = req.params.id; // Mengambil id dari parameter URL

  try {
    const addressExists = await getAddressModel(id); // Fungsi untuk memeriksa apakah pengguna sudah ada di database
    if (!addressExists) {
      res.status(404).json({ message: "Address not found" });
      return;
    }

    const deleted = await deleteAddressModel(id); // Fungsi untuk menghapus data pengguna berdasarkan id
    if (deleted) {
      res.status(200).json({ message: "Address deleted successfully" }); // Mengirimkan respons dengan status 200 jika pengguna berhasil dihapus
    } else {
      res.status(500).json({ message: "Error deleting address" }); // Mengirimkan respons dengan status 500 jika terjadi kesalahan saat menghapus pengguna
    }
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
