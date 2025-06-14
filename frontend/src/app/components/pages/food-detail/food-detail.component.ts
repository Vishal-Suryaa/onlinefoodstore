import { Component } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-food-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './food-detail.component.html',
  styleUrl: './food-detail.component.css'
})
export class FoodDetailComponent {
  food!: Food;
  quantity: number = 1;

  constructor(private foodService: FoodService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.food = this.foodService.getFoodById(params['id']);
      }
    });
  }

  addToCart() {
    // TODO: Implement cart functionality
    console.log('Added to cart:', this.food.name, 'Quantity:', this.quantity);
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
