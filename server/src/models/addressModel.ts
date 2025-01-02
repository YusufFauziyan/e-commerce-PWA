// models/userModel.ts
import db from "../config"; // Impor konfigurasi DB Anda
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { v4 as uuidv4 } from "uuid";
import { hashPassword } from "../utils/passwordUtils";

interface Address extends RowDataPacket {
  address_id: string;
  user_id: string;
  street_address: string;
  city: string;
  postal_code: string;
}

// get all address
export const getAllAddressModel = async (
  userId: string,
  role: string
): Promise<Address[]> => {
  let query = "";
  if (role === "admin") {
    query = "SELECT * FROM Address";
  } else {
    query = "SELECT * FROM Address WHERE user_id = ?";
  }
  const [rows] = await db.query<Address[]>(query, [userId]);
  return rows as Address[];
};

// get address by id
export const getAddressModel = async (id: string): Promise<Address | null> => {
  const query = "SELECT * FROM Address WHERE address_id = ?";
  const [rows] = await db.query<Address[]>(query, [id]);
  return rows.length ? rows[0] : null;
};

// post address
export const createAddressModel = async (
  address: Address
): Promise<Address> => {
  const { user_id, street_address, city, postal_code } = address;

  const addressId = uuidv4();
  const query =
    "INSERT INTO Address (address_id, user_id, street_address, city, postal_code) VALUES (?, ?, ?, ?, ?)";

  await db.query<ResultSetHeader>(query, [
    addressId,
    user_id,
    street_address,
    city,
    postal_code,
  ]);

  // Fetch the newly created address from the database
  const [rows] = await db.query<Address[]>(
    "SELECT * FROM Address WHERE address_id = ?",
    [addressId]
  );

  return rows[0];
};

// put address
export const updateAddressModel = async (
  id: string,
  address: Address
): Promise<Address | null> => {
  // Fetch the existing address
  const [rows] = await db.query<Address[]>(
    "SELECT * FROM Address WHERE address_id = ?",
    [id]
  );

  if (rows.length === 0) return null;

  const existingAddress = rows[0];

  // Update the address
  const query =
    "UPDATE Address SET street_address = ?, city = ?, postal_code = ? WHERE address_id = ?";

  await db.query<ResultSetHeader>(query, [
    address.street_address ?? existingAddress.street_address,
    address.city ?? existingAddress.city,
    address.postal_code ?? existingAddress.postal_code,
    id,
  ]);

  // Fetch and return the updated address
  const [updatedRows] = await db.query<Address[]>(
    "SELECT * FROM Address WHERE address_id = ?",
    [id]
  );

  return updatedRows[0];
};

// delete address
export const deleteAddressModel = async (id: string): Promise<boolean> => {
  const query = "DELETE FROM Address WHERE address_id = ?";
  const [result] = await db.query<ResultSetHeader>(query, [id]);
  return result.affectedRows > 0;
};
