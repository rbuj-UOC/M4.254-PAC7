import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {

  constructor(private localStorageService: LocalStorageService) { }

  set token(token: string) {
    this.localStorageService.saveData('token', token);
  }

  get token() {
    return this.localStorageService.getData('token');
  }

  isLoggedIn() {
    return this.token != null;
  }
}
