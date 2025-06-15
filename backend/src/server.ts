import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import foodRouter from "./router/food.router";
import userRouter from "./router/user.router";
import { connectToMongoDB } from "./configs/database.config";
import orderRouter from "./router/order.router";
connectToMongoDB();

const app = express();

app.use(cors({
  credentials: true,
  origin: ["http://localhost:4200"]
}));

app.use(express.json());

app.use("/api/foods", foodRouter);

app.use("/api/users", userRouter);

app.use("/api/orders", orderRouter);

const port = 5000;
app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});