import { model, Schema, Types } from "mongoose";
import { Food, FoodSchema } from "./food.model";
import { OrderStatus } from "../constants/order_status";

export interface LatLng {
  lat: number;
  lng: number;
}

export const LngLatSchema = new Schema<LatLng>({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

export interface OrderItem {
  food: Food;
  price: number;
  quantity: number;
}

export const OrderItemSchema = new Schema<OrderItem>({
  food: { type: FoodSchema, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export interface Order {
  id: string;
  items: OrderItem[];
  totalPrice: number;
  name: string;
  address: string;
  addressLatLng: LatLng;
  paymentId?: string;
  status: OrderStatus;
  user: Types.ObjectId;
  updatedAt: Date;
  createdAt: Date;
}

export const OrderSchema = new Schema<Order>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  addressLatLng: { type: LngLatSchema, required: true },
  items: { type: [OrderItemSchema], required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, default: OrderStatus.NEW },
  paymentId: { type: String },
  user: { type: Schema.Types.ObjectId, required: true },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
}, {
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
  timestamps: true,
});

export const OrderModel = model<Order>("Order", OrderSchema);
