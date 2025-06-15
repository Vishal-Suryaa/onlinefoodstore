import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LatLng, Map, Marker, tileLayer } from 'leaflet';
import { icon } from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  @Input() initialLatLng: LatLng = new LatLng(51.505, -0.09); // Default to London
  @Output() locationSelected = new EventEmitter<LatLng>();

  private map!: Map;
  private marker!: Marker;

  ngOnInit(): void {
    this.initializeMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private initializeMap(): void {
    // Fix Leaflet default icon issue
    const defaultIcon = icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    // Initialize map
    this.map = new Map('map').setView(this.initialLatLng, 13);
    
    // Add tile layer
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Add marker
    this.marker = new Marker(this.initialLatLng, {
      icon: defaultIcon,
      draggable: true
    }).addTo(this.map);

    // Handle marker drag end
    this.marker.on('dragend', () => {
      const position = this.marker.getLatLng();
      console.log('Marker dragged to:', {
        latitude: position.lat,
        longitude: position.lng,
        position: position
      });
      this.locationSelected.emit(position);
    });

    // Handle map click
    this.map.on('click', (e) => {
      const position = e.latlng;
      console.log('Map clicked at:', {
        latitude: position.lat,
        longitude: position.lng,
        position: position
      });
      this.marker.setLatLng(position);
      this.locationSelected.emit(position);
    });

    // Log initial position
    console.log('Initial map position:', {
      latitude: this.initialLatLng.lat,
      longitude: this.initialLatLng.lng,
      position: this.initialLatLng
    });
  }

  // Method to update marker position
  updateMarkerPosition(latLng: LatLng) {
    if (this.marker) {
      this.marker.setLatLng(latLng);
      this.map.setView(latLng);
    }
  }
} 