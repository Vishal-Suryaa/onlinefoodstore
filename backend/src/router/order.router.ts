import express from "express";
import asyncHandler from "express-async-handler";
import { OrderModel } from "../models/order.model";
import { HTTP_STATUS } from "../constants/http_status";
import { OrderStatus } from "../constants/order_status";
import auth from "../middlewares/auth.mid";

const router = express.Router();
router.use(auth);

router.post("/create", asyncHandler(async (req: express.Request, res: express.Response) => {
  const requestOrder = req.body;
  if (requestOrder?.items?.length <= 0) {
    res.status(HTTP_STATUS.BAD_REQUEST).send("Cart is empty!");
    return;
  }

  await OrderModel.deleteOne({ user: (req as any).user.id, status: OrderStatus.NEW });

  const newOrder = new OrderModel({ ...requestOrder, user: (req as any).user.id });
  await newOrder.save();
  res.status(HTTP_STATUS.CREATED).send(newOrder);
}));

export default router;