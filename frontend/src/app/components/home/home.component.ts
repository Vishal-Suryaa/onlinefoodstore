import { Component, OnInit } from '@angular/core';
import { Food } from '../../shared/models/food';
import { FoodService } from '../../services/food.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../partials/search-bar/search-bar.component';
import { TagsComponent } from '../partials/tags/tags.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, NgxStarRatingModule, FormsModule, SearchBarComponent, TagsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];
  searchTerm: string = '';
  
  constructor(private foodService: FoodService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.searchTerm) {
        this.searchTerm = params.searchTerm;
        this.foods = this.foodService.getAllFoodsBySearchTerm(this.searchTerm);
      } else if (params.tag) {
        this.foods = this.foodService.getAllFoodsByTag(params.tag);
      } else {
        this.foods = this.foodService.getAll();
      }
    });
  }

  filterFoods() {
    if (this.searchTerm) {
      this.router.navigateByUrl('/search/' + this.searchTerm);
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
