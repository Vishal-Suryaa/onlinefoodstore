import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/user';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { UserCheckoutInfoComponent } from './user-checkout-info/user-checkout-info.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, OrderSummaryComponent, UserCheckoutInfoComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  user!: User;

  constructor(
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart().items;
    this.totalPrice = this.cartService.getCart().totalPrice;
    this.user = this.userService.currentUser;
  }

  onFormSubmit(formData: any) {
    console.log('Checkout form submitted:', {
      ...formData,
      items: this.cartItems,
      totalPrice: this.totalPrice
    });
  }
}
