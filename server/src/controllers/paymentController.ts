// controllers/userController.ts
import { Request, Response } from "express";
import {
  createPaymentModel,
  getPaymentModel,
  getAllPaymentModel,
  updatePaymentModel,
} from "../models/paymentModel";
import { getUserByIdModel } from "../models/userModel";
import coreApi from "../config/midtransConfig";
import { getOrderModel } from "../models/orderModel";
import { getProductModel, updateProductModel } from "../models/productModel";

// Fetch all Payment or the logged-in Payment's data based on their role
export const getAllPayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const loggedInUser = (req as any).user;

  if (!loggedInUser) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const payment = await getAllPaymentModel(
      loggedInUser.id,
      loggedInUser.role
    );

    res.status(200).json(payment);
  } catch (error) {
    console.error("Error retrieving payment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Payment by id
export const getPayment = async (req: Request, res: Response) => {
  const id = req.params.id; // Mengambil id dari parameter URL
  try {
    const payment = await getPaymentModel(id);
    if (payment) {
      res.status(200).json(payment);
    } else {
      res.status(404).json({ message: "Payment not found" });
    }
  } catch (error) {
    console.error("Error retrieving payment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// create Payment
export const createPayment = async (req: Request, res: Response) => {
  const loggedInUser = (req as any).user;
  const { order_id } = req.body;

  if (!loggedInUser) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (!order_id) {
    res.status(400).json({ message: "order_id is required" });
    return;
  }

  try {
    // detail user
    const user = await getUserByIdModel(loggedInUser.id);
    // detail order
    const order = await getOrderModel(order_id);

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const payment = await createPaymentModel({
      ...req.body,
      user_id: loggedInUser.id,
    });

    const item_details = order.orders.map((orderItem: any) => ({
      id: orderItem.id,
      price: Number(orderItem.product.price),
      quantity: orderItem.quantity,
      name: orderItem.product.name,
      category: orderItem.product.categories.join(","),
    }));

    const totalAmount = item_details.reduce(
      (acc: number, item: any) => acc + item.price * item.quantity,
      0
    );

    const parameters = {
      transaction_details: {
        order_id: payment.id,
        gross_amount: totalAmount,
      },
      credit_card: { secure: true },
      customer_details: {
        email: user.email,
        phone: user.phone_number,
      },
      item_details,
    };

    // post to midtrans
    const transactionToken = await coreApi.createTransactionToken(parameters);

    res.status(201).json({
      payment,
      message: "Payment created successfully",
      transactionToken,
    });
  } catch (error) {
    console.error("Error retrieving payment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// payment noitifaction
export const paymentNotification = async (req: Request, res: Response) => {
  const { order_id, status_code } = req.body;

  try {
    const exitingPayment = await getPaymentModel(order_id);

    if (!exitingPayment) {
      res.status(404).json({ message: "Payment not found" });
      return;
    }

    const productsOrdered = exitingPayment.order.orders;

    if (status_code === "201" || status_code === "200") {
      // payment midtrans created (201) or success (200)

      await updatePaymentModel(order_id, req.body);

      if (status_code === "200") {
        // decrese stock and increase sold
        for (const { product, quantity } of productsOrdered) {
          const productId = product.id;
          const stock = Number(product.stock_quantity);
          const sold = Number(product.sold_quantity);

          const totalStock = stock - quantity;
          const totalSold = sold + quantity;

          await updateProductModel(productId, {
            stock_quantity: totalStock,
            sold_quantity: totalSold,
          });
        }

        console.log("Stock and sold quantity updated");
      }

      res.status(200).json({ message: "Payment notification received" });

      return;
    }

    res
      .status(400)
      .json({ message: "Payment notification failed", data: req.body });
  } catch (error) {
    console.error("Error updating payment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
