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
  isExpired: boolean = false;
  selectedLocation: LatLng = new L.LatLng(51.505, -0.09); // Default to London

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      name: [this.user.name, [Validators.required]],
      address: [this.user.address, [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$')]],
      expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{2})$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
    });
  }

  formatCardNumber(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 16) {
      value = value.slice(0, 16);
    }
    
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    
    this.checkoutForm.patchValue({
      cardNumber: formattedValue
    }, { emitEvent: false });
  }

  formatExpiryDate(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length > 0) {
      if (value.length <= 2) {
        const month = parseInt(value);
        if (month > 12) {
          value = '12';
        }
      }
      
      if (value.length > 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
      }
      
      if (value.length > 5) {
        value = value.slice(0, 5);
      }
    }
    
    this.checkoutForm.patchValue({
      expiryDate: value
    }, { emitEvent: false });

    if (value.length === 5) {
      this.checkCardExpiry(value);
    }
  }

  checkCardExpiry(expiryDate: string) {
    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    const expYear = parseInt(year);
    const expMonth = parseInt(month);

    this.isExpired = 
      expYear < currentYear || 
      (expYear === currentYear && expMonth < currentMonth);
  }

  formatCVV(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 3) {
      value = value.slice(0, 3);
    }
    
    this.checkoutForm.patchValue({
      cvv: value
    }, { emitEvent: false });
  }

  onLocationSelected(location: LatLng) {
    this.selectedLocation = location;
  }

  onSubmit() {
    if (this.checkoutForm.valid && !this.isExpired) {
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