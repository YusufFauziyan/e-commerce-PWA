// models/userModel.ts
import db from "../config"; // Impor konfigurasi DB Anda
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { v4 as uuidv4 } from "uuid";
import { getProductModel } from "./productModel";
import { getAddressModel } from "./addressModel";
import { createOrderItemModel, getAllOrderItemModel } from "./orderItemsModel";

interface Order extends RowDataPacket {
  user_id: string;
  status: string;
  total_price: number;
  order_date: string;
  address_id: string;
}

interface OrderItem extends RowDataPacket {
  order_id: string;
  product_id: string;
  quantity: number;
}

// get all order
export const getAllOrderModel = async (
  userId: string,
  role: string
): Promise<Order[]> => {
  let query = "";
  if (role === "admin") {
    query = "SELECT * FROM `Order`";
  } else {
    query = "SELECT * FROM `Order` WHERE user_id = ?";
  }

  const [rows] = await db.query<Order[]>(query, [userId]);

  const orders = await Promise.all(
    rows.map(async ({ order_id, ...order }) => {
      return {
        ...order,
        id: order_id,
        address: await getAddressModel(order.address_id),
        orders: await getAllOrderItemModel(order_id),
      };
    })
  );

  return orders as Order[];
};

// get order by id
export const getOrderModel = async (id: string): Promise<Order | null> => {
  const query = "SELECT * FROM `Order` WHERE order_id = ?";
  const [rows] = await db.query<Order[]>(query, [id]);

  if (rows.length === 0) return null;

  const address = await getAddressModel(rows[0].address_id);
  const orderItem = await getAllOrderItemModel(id);

  const { order_id, ...order } = rows[0];

  return {
    ...order,
    id: order_id,
    address,
    orders: orderItem,
  };
};

// post order
export const createOrderModel = async (order: Order): Promise<Order> => {
  const { user_id, status, total_price, address_id, orders } = order;

  const orderId = uuidv4();
  // Convert to MySQL DATETIME format
  const orderDate = new Date().toISOString().slice(0, 19).replace("T", " ");

  const query =
    "INSERT INTO `Order` (order_id, user_id, status, total_price, order_date, address_id) VALUES (?, ?, ?, ?, ?, ?)";

  await db.query<ResultSetHeader>(query, [
    orderId,
    user_id,
    status,
    total_price,
    orderDate,
    address_id,
  ]);

  // Insert order items
  let ordersResult = [] as OrderItem[];

  await Promise.all(
    orders.map(async (orderItem: OrderItem) => {
      const result = await createOrderItemModel(orderId, orderItem);

      ordersResult.push(result);
    })
  );

  // Fetch the newly created order from the database
  const [rows] = await db.query<Order[]>(
    "SELECT * FROM `Order` WHERE order_id = ?",
    [orderId]
  );

  const address = await getAddressModel(address_id);

  const { order_id, ...orderResult } = rows[0];

  return {
    ...orderResult,
    id: order_id,
    address,
    orders: ordersResult,
  };
};

// put order
export const updateOrderModel = async (
  id: string,
  order: Order
): Promise<Order | null> => {
  // Fetch the existing order
  const [rows] = await db.query<Order[]>(
    "SELECT * FROM `Order` WHERE order_id = ?",
    [id]
  );

  if (rows.length === 0) return null;

  const existingOrder = rows[0];

  // Update the order
  const query =
    "UPDATE `Order` SET status = ?, total_price = ?, order_date = ?, address_id = ?  WHERE order_id = ?";

  await db.query<ResultSetHeader>(query, [
    order.status ?? existingOrder.status,
    order.total_price ?? existingOrder.total_price,
    order.order_date ?? existingOrder.order_date,
    order.address_id ?? existingOrder.address_id,
    id,
  ]);

  // Fetch and return the updated order
  const [updatedRows] = await db.query<Order[]>(
    "SELECT * FROM `Order` WHERE order_id = ?",
    [id]
  );

  const address = await getAddressModel(updatedRows[0].address_id);
  const { order_id, ...orderResult } = updatedRows[0];

  return {
    ...orderResult,
    id: order_id,
    address,
  };
};

// delete order
export const deleteOrderModel = async (id: string): Promise<boolean> => {
  const query = "DELETE FROM `Order` WHERE order_id = ?";
  const [result] = await db.query<ResultSetHeader>(query, [id]);
  return result.affectedRows > 0;
};
