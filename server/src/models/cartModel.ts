// models/userModel.ts
import db from "../config"; // Impor konfigurasi DB Anda
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { v4 as uuidv4 } from "uuid";
import { getProductModel } from "./productModel";

interface Cart extends RowDataPacket {
  product_id: string;
  quantity: number;
  total_price: number;
  user_id: string;
}

// get all cart
export const getAllCartModel = async (
  userId: string,
  role: string
): Promise<Cart[]> => {
  let query = "";
  if (role === "admin") {
    query = "SELECT * FROM Cart";
  } else {
    query = "SELECT * FROM Cart WHERE user_id = ?";
  }

  const [rows] = await db.query<Cart[]>(query, [userId]);

  const carts = await Promise.all(
    rows.map(async ({ cart_id, ...cart }) => {
      return {
        ...cart,
        id: cart_id,
        product: await getProductModel(cart.product_id),
      };
    })
  );

  return carts as Cart[];
};

// get cart by id
export const getCartModel = async (id: string): Promise<Cart | null> => {
  const query = "SELECT * FROM Cart WHERE cart_id = ?";
  const [rows] = await db.query<Cart[]>(query, [id]);

  if (rows.length === 0) return null;

  const product = await getProductModel(rows[0].product_id);
  const { cart_id, ...cart } = rows[0];

  return {
    ...cart,
    id: cart_id,
    product,
  };
};

// post cart
export const createCartModel = async (cart: Cart): Promise<Cart> => {
  const { product_id, quantity, total_price, user_id } = cart;

  const cartId = uuidv4();
  const query =
    "INSERT INTO Cart (cart_id, product_id, quantity, total_price, user_id) VALUES (?, ?, ?, ?, ?)";

  await db.query<ResultSetHeader>(query, [
    cartId,
    product_id,
    quantity,
    total_price,
    user_id,
  ]);

  // Fetch the newly created cart from the database
  const [rows] = await db.query<Cart[]>(
    "SELECT * FROM Cart WHERE cart_id = ?",
    [cartId]
  );

  const product = await getProductModel(product_id);
  const { cart_id, ...row } = rows[0];

  return {
    ...row,
    id: cart_id,
    product,
  };
};

// put cart
export const updateCartModel = async (
  id: string,
  cart: Cart
): Promise<Cart | null> => {
  // Fetch the existing cart
  const [rows] = await db.query<Cart[]>(
    "SELECT * FROM Cart WHERE cart_id = ?",
    [id]
  );

  if (rows.length === 0) return null;

  const existingCart = rows[0];

  // Update the cart
  const query =
    "UPDATE Cart SET product_id = ?, quantity = ?, total_price = ? WHERE cart_id = ?";

  await db.query<ResultSetHeader>(query, [
    cart.product_id ?? existingCart.product_id,
    cart.quantity ?? existingCart.quantity,
    cart.total_price ?? existingCart.total_price,
    id,
  ]);

  // Fetch and return the updated cart
  const [updatedRows] = await db.query<Cart[]>(
    "SELECT * FROM Cart WHERE cart_id = ?",
    [id]
  );

  const product = await getProductModel(updatedRows[0].product_id);
  const { cart_id, ...row } = updatedRows[0];

  return {
    ...row,
    id: cart_id,
    product,
  };
};

// delete cart
export const deleteCartModel = async (id: string): Promise<boolean> => {
  const query = "DELETE FROM Cart WHERE cart_id = ?";
  const [result] = await db.query<ResultSetHeader>(query, [id]);
  return result.affectedRows > 0;
};
