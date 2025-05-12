import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserResponse, NewUser } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment.prod';
import { HandlerResponse } from '../utils/Handler-response.util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.API_URL;

  public registerNewUser(
    newUser: NewUser
  ): Observable<HandlerResponse<CreateUserResponse>> {
    return this.http.post<HandlerResponse<CreateUserResponse>>(
      `${this.apiUrl}user/create`,
      newUser
    );
  }
}
