import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthStoreService } from '../services/auth-store-service';

@Injectable()
export class AuthGuard implements CanActivate {
  private userStore = inject(AuthStoreService);
  private router = inject(Router);

  canActivate(): boolean {
    console.log('AuthGuard#canActivate called');

    if (this.userStore.isLoggedIn()) {
      return true;
    }

    console.log('AuthGuard#canActivate not authorized to access page');
    // Can store current route and redirect back to it
    // Store it in a service, add it to a query param
    this.router.navigate(['/auth/login']);

    return false;
  }
}
