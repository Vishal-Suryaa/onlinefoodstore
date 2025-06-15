import { HttpInterceptorFn } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  const user = userService.currentUser;
    if (user && user.token) {
    console.log('Auth Interceptor - Adding token to request');
    req = req.clone({
      setHeaders: {
        'access_token': user.token
      }
    });
  } else {
    console.log('Auth Interceptor - No token available');
  }
  return next(req);
};
