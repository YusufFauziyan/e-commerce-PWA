// models/userModel.ts
import db from "../config"; // Impor konfigurasi DB Anda
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { v4 as uuidv4 } from "uuid";
import { getAddressModel } from "./addressModel";
import { getProductModel } from "./productModel";

interface OrderItem extends RowDataPacket {
  order_id: string;
  product_id: string;
  quantity: number;
}

// get all order
export const getAllOrderItemModel = async (
  orderId: string
): Promise<OrderItem[]> => {
  const query = "SELECT * FROM Order_Item WHERE order_id = ?";

  const [rows] = await db.query<OrderItem[]>(query, [orderId]);

  const results = await Promise.all(
    rows.map(async ({ order_item_id, ...order }) => {
      return {
        ...order,
        id: order_item_id,
        product: await getProductModel(order.product_id),
      };
    })
  );

  return results as OrderItem[];
};

// // post order
export const createOrderItemModel = async (
  orderId: string,
  order: OrderItem
): Promise<OrderItem> => {
  const { product_id, quantity } = order;

  const orderItemId = uuidv4();

  const query =
    "INSERT INTO Order_Item (order_item_id, order_id, product_id, quantity) VALUES (?, ?, ?, ?)";

  await db.query<ResultSetHeader>(query, [
    orderItemId,
    orderId,
    product_id,
    quantity,
  ]);

  // Fetch the newly created order from the database
  const [rows] = await db.query<OrderItem[]>(
    "SELECT * FROM Order_Item WHERE order_item_id = ?",
    [orderItemId]
  );

  const product = await getProductModel(product_id);
  const { order_item_id, ...newOrder } = rows[0];

  return {
    ...newOrder,
    id: order_item_id,
    product,
  };
};
