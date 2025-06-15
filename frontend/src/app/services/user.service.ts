import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { User } from '../shared/models/user';
import { UserLogin } from '../shared/interfaces/userLogin';
import { ToastrService } from 'ngx-toastr';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;
  
  constructor(private http: HttpClient, private toastrService: ToastrService) { 
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin: UserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.userSubject.next(user);
          localStorage.setItem(USER_KEY, JSON.stringify(user));
          this.toastrService.success(`Welcome to Food App ${user.name}`, 'Login Successful');
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        }
      })
    );
  }

  logout() {
    const emptyUser: User = {
      id: '',
      email: '',
      name: '',
      address: '',
      token: '',
      isAdmin: false,
    };
    this.userSubject.next(emptyUser);
    localStorage.removeItem(USER_KEY);
    this.toastrService.success('Logged out successfully', 'Logout');
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return {
      id: '',
      email: '',
      name: '',
      address: '',
      token: '',
      isAdmin: false,
    };
  }
}
