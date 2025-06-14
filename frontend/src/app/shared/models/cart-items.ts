import { Food } from "./food";

export class CartItem {
  quantity: number = 1;
  price: number = 0;
  constructor(public food: Food) {
    this.price = this.food.price;
  }
}