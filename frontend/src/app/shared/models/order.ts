import { LatLng } from "leaflet";
import { CartItem } from "./cart-items";

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  name: string;
  address: string;
  addressLatLng: LatLng;
  paymentId: string;
  createdAt: string;
  status: string;
}