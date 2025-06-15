import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartCount: number = 0;
  user!: User;
  private userSubscription!: Subscription;
  private cartSubscription!: Subscription;

  constructor(
    private router: Router,
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.cartSubscription = this.cartService.getCartObservable().subscribe((cart) => {
      this.cartCount = cart.items.length;
    });

    this.userSubscription = this.userService.userObservable.subscribe((user) => {
      this.user = user;
      console.log('user', this.user);
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  onLogoClick() {
    this.router.navigate(['/']);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
