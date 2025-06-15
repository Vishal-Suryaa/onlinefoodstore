import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../shared/models/order';
import { MapComponent } from '../../../components/partials/map/map.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, MapComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  order!: Order;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        this.order = order;
      },
      error: (error) => {
        console.error('Error fetching order:', error);
      }
    });
  }
}
