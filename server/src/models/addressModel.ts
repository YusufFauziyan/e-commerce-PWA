// models/userModel.ts
import db from "../config"; // Impor konfigurasi DB Anda
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { v4 as uuidv4 } from "uuid";
import { hashPassword } from "../utils/passwordUtils";

interface Address extends RowDataPacket {
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
  const address = rows.map(({ address_id, ...row }) => {
    return {
      ...row,
      id: address_id,
    };
  });

  return address as Address[];
};

// get address by id
export const getAddressModel = async (id: string): Promise<Address | null> => {
  const query = "SELECT * FROM Address WHERE address_id = ?";
  const [rows] = await db.query<Address[]>(query, [id]);

  if (rows.length === 0) return null;

  const { address_id, ...address } = rows[0];

  return { ...address, id: address_id };
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
  const addressDetail = await getAddressModel(addressId);

  return addressDetail as Address;
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
  const addressDetail = await getAddressModel(id);

  return addressDetail as Address;
};

// delete address
export const deleteAddressModel = async (id: string): Promise<boolean> => {
  const query = "DELETE FROM Address WHERE address_id = ?";
  const [result] = await db.query<ResultSetHeader>(query, [id]);
  return result.affectedRows > 0;
};
