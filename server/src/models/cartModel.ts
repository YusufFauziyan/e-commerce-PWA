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
  role: string,
  orderBy: string,
  sortOrder: string,
  offset: number,
  limit: number
): Promise<{
  items: Cart[];
  total: number;
}> => {
  const isAdmin = role === "admin";
  let query = "";
  let queryTotal = "";

  // Validate orderBy and sortOrder
  const validOrderBy = ["created_at"].includes(orderBy)
    ? orderBy
    : "created_at"; // Default to created_at
  const validSortOrder = sortOrder.toLowerCase() === "desc" ? "DESC" : "ASC";

  if (isAdmin) {
    query = `
      SELECT 
        * 
      FROM 
        Cart 
      ORDER BY 
        ${validOrderBy} ${validSortOrder}
      LIMIT ? OFFSET ?;
    `;
    queryTotal = "SELECT COUNT(*) AS total FROM Cart";
  } else {
    query = `
      SELECT 
        * 
      FROM 
        Cart 
      WHERE 
        user_id = ?
      ORDER BY
        ${validOrderBy} ${validSortOrder}
      LIMIT ? OFFSET ?
      `;
    queryTotal = `SELECT COUNT(*) AS total FROM Cart WHERE user_id = ?`;
  }

  const [rows] = await db.query<Cart[]>(
    query,
    isAdmin ? [limit, offset] : [userId, limit, offset]
  );
  const [totalRows] = await db.query(queryTotal, [userId]);
  const total = (totalRows as RowDataPacket[])[0].total;

  const carts = await Promise.all(
    rows.map(async ({ cart_id, ...cart }) => {
      return {
        ...cart,
        id: cart_id,
        product: await getProductModel(cart.product_id),
      };
    })
  );

  return { items: carts, total };
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

// total cart
export const getTotalCartModel = async (userId: string): Promise<number> => {
  const query = "SELECT COUNT(*) AS total FROM Cart WHERE user_id = ?";
  const [rows] = await db.query(query, [userId]);
  const total = (rows as RowDataPacket[])[0].total;

  return total;
};
