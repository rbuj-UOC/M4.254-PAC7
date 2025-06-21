import { Injectable, inject } from '@angular/core';
import { LocalStorageService } from './local-storage-service';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {
  private localStorageService = inject(LocalStorageService);

  set token(token: string) {
    this.localStorageService.saveData('token', token);
  }

  get token(): string | null {
    return this.localStorageService.getData('token');
  }

  isLoggedIn() {
    return this.token != null;
  }
}
