import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchTerm: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      if (params.searchTerm) {
        this.searchTerm = params.searchTerm;
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
