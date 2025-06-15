import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {
  user = {
    name: '',
    email: '',
    password: '',
    address: ''
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  onSubmit() {
    this.userService.register(this.user).subscribe({
      next: (user: User) => {
        this.userService.login({ email: this.user.email, password: this.user.password }).subscribe({
          next: (loggedInUser: User) => {
            this.toastrService.success(`Welcome ${loggedInUser.name}!`, 'Registration Successful');
            this.router.navigateByUrl('/');
          },
          error: (errorResponse: any) => {
            this.toastrService.error(errorResponse.error, 'Auto-login Failed');
            this.router.navigateByUrl('/login');
          }
        });
      },
      error: (errorResponse: any) => {
        this.toastrService.error(errorResponse.error, 'Registration Failed');
      }
    });
  }
}
