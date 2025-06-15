import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../shared/models/user';
import { MapComponent } from '../../../partials/map/map.component';
import { LatLng } from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-user-checkout-info',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MapComponent],
  templateUrl: './user-checkout-info.component.html',
  styleUrl: './user-checkout-info.component.css'
})
export class UserCheckoutInfoComponent {
  @Input() user!: User;
  @Output() formSubmit = new EventEmitter<any>();

  checkoutForm!: FormGroup;
  selectedLocation: LatLng = new L.LatLng(51.505, -0.09); // Default to London

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      name: [this.user.name, [Validators.required]],
      address: [this.user.address, [Validators.required]]
    });
  }

  onLocationSelected(location: LatLng) {
    this.selectedLocation = location;
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      console.log('Form submitted:', {
        ...this.checkoutForm.value,
        addressLatLng: this.selectedLocation
      });
      this.formSubmit.emit({
        ...this.checkoutForm.value,
        addressLatLng: this.selectedLocation
      });
    }
  }
} 