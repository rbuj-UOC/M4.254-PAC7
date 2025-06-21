import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthStoreService } from './auth-store-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private authStore = inject(AuthStoreService);

  login(username: string, password: string): Observable<any> {
    return this.http
      .post('/api/user/login', {
        username: username,
        password: password
      })
      .pipe(
        map((resp: any) => {
          this.authStore.token = resp.token;
          return resp;
        })
      );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post('/api/user/register', {
      username: username,
      password: password
    });
  }
}
