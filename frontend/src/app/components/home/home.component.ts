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
        this.foodService.getAllFoodsBySearchTerm(this.searchTerm).subscribe(serverFoods => {
          this.foods = serverFoods;
        });
      } else if (params.tag) {
        this.foodService.getAllFoodsByTag(params.tag).subscribe(serverFoods => {
          this.foods = serverFoods;
        });
      } else {
        this.foodService.getAll().subscribe(serverFoods => {
          this.foods = serverFoods;
        });
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

  resetSearch() {
    this.searchTerm = '';
    this.router.navigateByUrl('/');
  }
}
