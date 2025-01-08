// models/userModel.ts
import db from "../config"; // Impor konfigurasi DB Anda
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { v4 as uuidv4 } from "uuid";
import { hashPassword } from "../utils/passwordUtils";
import { getOrderModel } from "./orderModel";
import { getAddressModel } from "./addressModel";

interface Shipping extends RowDataPacket {
  order_id: string;
  address_id: string;
  shipping_date: string;
  delivery_date: string;
  tracking_number: string;
}

// get all shipping
export const getAllShippingModel = async (
  userId: string,
  role: string
): Promise<Shipping[]> => {
  let query = "";
  if (role === "admin") {
    query = "SELECT * FROM Shipping";
  } else {
    query =
      "SELECT * FROM Shipping s JOIN `Order` o ON s.order_id = o.order_id WHERE user_id = ?";
  }
  const [rows] = await db.query<Shipping[]>(query, [userId]);
  const shipping = rows.map(({ shipping_id, ...row }) => {
    return {
      ...row,
      id: shipping_id,
    };
  });

  return shipping as Shipping[];
};

// get shipping by id
export const getShippingModel = async (
  id: string
): Promise<Shipping | null> => {
  const query = "SELECT * FROM Shipping WHERE shipping_id = ?";
  const [rows] = await db.query<Shipping[]>(query, [id]);

  if (rows.length === 0) return null;

  const { shipping_id, ...shipping } = rows[0];
  const order = await getOrderModel(shipping.order_id);
  const address = await getAddressModel(shipping.address_id);

  return { ...shipping, id: shipping_id, order, address };
};

// post shipping
export const createShippingModel = async (
  shipping: Shipping
): Promise<Shipping> => {
  const { order_id, address_id } = shipping;

  const shippingId = uuidv4();
  const query =
    "INSERT INTO Shipping (shipping_id, order_id, address_id) VALUES (?, ?, ?)";

  await db.query<ResultSetHeader>(query, [shippingId, order_id, address_id]);

  // Fetch the newly created shipping from the database
  const [rows] = await db.query<Shipping[]>(
    "SELECT * FROM Shipping WHERE shipping_id = ?",
    [shippingId]
  );

  const { shipping_id, ...row } = rows[0];
  const order = await getOrderModel(order_id);
  const address = await getAddressModel(address_id);

  return { ...row, id: shipping_id, order, address };
};

// put shipping
export const updateShippingModel = async (
  id: string,
  shipping: Shipping
): Promise<Shipping | null> => {
  // Fetch the existing shipping
  const [rows] = await db.query<Shipping[]>(
    "SELECT * FROM Shipping WHERE shipping_id = ?",
    [id]
  );

  if (rows.length === 0) return null;

  const existingShipping = rows[0];

  // Update the shipping
  const query =
    "UPDATE Shipping SET shipping_date = ?, delivery_date = ?, tracking_number = ? WHERE shipping_id = ?";

  await db.query<ResultSetHeader>(query, [
    shipping.shipping_date ?? existingShipping.shipping_date,
    shipping.delivery_date ?? existingShipping.delivery_date,
    shipping.tracking_number ?? existingShipping.tracking_number,
    id,
  ]);

  // Fetch and return the updated shipping
  const [updatedRows] = await db.query<Shipping[]>(
    "SELECT * FROM Shipping WHERE shipping_id = ?",
    [id]
  );

  const { shipping_id, ...row } = updatedRows[0];

  return { ...row, id: shipping_id };
};

// delete shipping
export const deleteShippingModel = async (id: string): Promise<boolean> => {
  const query = "DELETE FROM Shipping WHERE shipping_id = ?";
  const [result] = await db.query<ResultSetHeader>(query, [id]);
  return result.affectedRows > 0;
};
