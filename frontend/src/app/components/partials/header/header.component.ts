import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartCount: number = 0;
  user!: User;

  constructor(
    private router: Router,
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cartCount = cart.items.length;
    });

    this.userService.userObservable.subscribe((user) => {
      this.user = user;
    });
  }

  onLogoClick() {
    this.router.navigate(['/']);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
