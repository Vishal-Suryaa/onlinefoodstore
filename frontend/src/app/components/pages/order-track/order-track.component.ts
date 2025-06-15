import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../shared/models/order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-track',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-track.component.html',
  styleUrl: './order-track.component.css',
  styles: [`
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
  `]
})
export class OrderTrackComponent implements OnInit {
  order!: Order;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const orderId = this.route.snapshot.params['orderId'];
    this.orderService.trackOrderById(orderId).subscribe(order => {
      this.order = order;
    });
  }
}
