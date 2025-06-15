import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/user';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { UserCheckoutInfoComponent } from './user-checkout-info/user-checkout-info.component';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';

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
    private userService: UserService,
    private toastr: ToastrService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart().items;
    this.totalPrice = this.cartService.getCart().totalPrice;
    this.user = this.userService.currentUser;
  }

  onFormSubmit(formData: any) {
    
    const payload = {
      ...formData,
      items: this.cartItems,
      totalPrice: this.totalPrice
    }
    console.log('Checkout form submitted:', payload);
    if(!formData.addressLatLng) {
      this.toastr.error('Please select a location on the map');
      return;
    }
    console.log('Checkout payload', payload);
    this.orderService.create(payload).subscribe({
      next: (order) => {
        this.router.navigateByUrl(`/payment?orderId=${order.id}`);
      },
      error: (error) => {
        this.toastr.error(error.message, 'Error');
      }
    });
  }
}
