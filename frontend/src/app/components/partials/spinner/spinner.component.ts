import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent implements OnInit {
  isLoading = false;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingService.loadingAction.subscribe(
      (loading) => this.isLoading = loading
    );
  }
}
