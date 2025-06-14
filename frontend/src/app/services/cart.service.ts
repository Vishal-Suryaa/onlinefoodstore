import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/cart';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Food } from '../shared/models/food';
import { CartItem } from '../shared/models/cart-items';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() { }

  addToCart(food: Food) {
    let cartItem = this.cart.items.find(item => item.food.id === food.id);
    if (cartItem) {
      this.changeQuantity(food.id, cartItem.quantity + 1);
    } else {
      this.cart.items.push(new CartItem(food));
    }
    this.setCartToLocalStorage();
  }

  removeFromCart(id: number) {
    this.cart.items = this.cart.items.filter(item => item.food.id != id);
    this.setCartToLocalStorage();
  }

  changeQuantity(id: number, quantity: number) {
    let cartItem = this.cart.items.find(item => item.food.id === id);
    if (!cartItem) return;
    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable() {
    return this.cartSubject.asObservable();
  }

  getCart() {
    return this.cartSubject.value;
  }

  private setCartToLocalStorage() {
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage() {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
