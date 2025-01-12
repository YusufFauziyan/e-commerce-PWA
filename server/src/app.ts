import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";

// routes
import authRoutes from "./routes/authRoutes";
import verifyRoutes from "./routes/verifyRoutes";
import userRoutes from "./routes/userRoutes";
import addressRoutes from "./routes/addressRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";
import shippingRoutes from "./routes/shippingRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import reviewRoutes from "./routes/reviewRoutes";

const app: Express = express();

// Enable CORS
app.use(
  cors({
    origin: "*", // Change this to the domain you will make requests from
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Jika menggunakan cookies/token
  })
);

app.use(bodyParser.json());
app.use("/api", authRoutes);
app.use("/api", verifyRoutes);
app.use("/api/collection", userRoutes);
app.use("/api/collection", addressRoutes);
app.use("/api/collection", categoryRoutes);
app.use("/api/collection", productRoutes);
app.use("/api/collection", cartRoutes);
app.use("/api/collection", orderRoutes);
app.use("/api/collection", shippingRoutes);
app.use("/api/collection", reviewRoutes);
app.use("/api", paymentRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
