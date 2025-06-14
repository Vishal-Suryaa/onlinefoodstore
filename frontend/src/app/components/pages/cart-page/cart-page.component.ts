import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../shared/models/cart';
import { CartItem } from '../../../shared/models/cart-items';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {
  cart!: Cart;

  constructor(private cartService: CartService) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  ngOnInit(): void {
  }

  removeFromCart(id: number) {
    this.cartService.removeFromCart(id);
  }

  changeQuantity(id: number, quantity: number) {
    this.cartService.changeQuantity(id, quantity);
  }
}
