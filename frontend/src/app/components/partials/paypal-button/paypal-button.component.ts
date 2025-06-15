import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { OrderService } from '../../../services/order.service';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

declare var paypal: any;

@Component({
  selector: 'app-paypal-button',
  imports: [],
  templateUrl: './paypal-button.component.html',
  styleUrl: './paypal-button.component.css',
})
export class PaypalButtonComponent implements OnInit {
  @Input() order!: Order;

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.paypalPayment();
  }

  paypalPayment() {
    return paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency: 'USD',
                value: this.order.totalPrice,
              },
            },
          ],
        });
      },
      onApprove: async (data: any, actions: any) => {
        const payment = await actions.order.capture();
        this.order.paymentId = payment.id;
        this.orderService.pay(this.order).subscribe({
          next: (orderId) => {
            this.cartService.clearCart();
            this.router.navigateByUrl('/track/' + orderId);
            this.toastr.success('Payment successful', 'Success');
          },
          error: (errorResponse: any) => {
            this.toastr.error(errorResponse.error, 'Payment failed');
          },
        });
      },
      onError: (error: any) => {
        this.toastr.error(error.message, 'Payment failed');
      },
    }).render('#paypal-button-container');
  }
}
