import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const foundTokenGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  return token ? true : router.parseUrl('/login');
};
