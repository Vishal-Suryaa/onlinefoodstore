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

router.get("/newOrderForCurrentUser", asyncHandler(async (req: express.Request, res: express.Response) => {
  const order = await getNewOrderForCurrentUser(req);
  if (order) {
    res.status(HTTP_STATUS.OK).send(order);
  } else {
    res.status(HTTP_STATUS.NOT_FOUND).send("No order found");
  }
}));

router.post("/pay", asyncHandler(async (req: express.Request, res: express.Response) => {
  console.log('Pay request', req.body);
  const { paymentId } = req.body;
  const order = await getNewOrderForCurrentUser(req);
  if (!order) {
    res.status(HTTP_STATUS.NOT_FOUND).send("Order not found");
    return;
  }
  order.paymentId = paymentId;
  order.status = OrderStatus.SUCCESS;
  await order.save();
  res.status(HTTP_STATUS.OK).json({ id: order.id });
}));

router.get("/track/:id", asyncHandler(async (req: express.Request, res: express.Response) => {
  const order = await OrderModel.findById(req.params.id);
  if (order) {
    res.status(HTTP_STATUS.OK).send(order);
  } else {
    res.status(HTTP_STATUS.NOT_FOUND).send("Order not found");
  }
}));

export default router;

function getNewOrderForCurrentUser(req: express.Request) {
  return OrderModel.findOne({ user: (req as any).user.id, status: OrderStatus.NEW });
}
