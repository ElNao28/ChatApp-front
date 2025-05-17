import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateUserResponse,
  LoginUser,
  NewUser,
  UserDecoded,
} from '../interfaces/user.interface';
import { environment } from 'src/environments/environment.prod';
import { HandlerResponse } from '../utils/Handler-response.util';
import { Observable } from 'rxjs';
import { ResponseLogin } from '../interfaces/login.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.API_URL;
  private jwtHelper = new JwtHelperService();

  public registerNewUser(
    newUser: NewUser
  ): Observable<HandlerResponse<CreateUserResponse>> {
    return this.http.post<HandlerResponse<CreateUserResponse>>(
      `${this.apiUrl}user/create`,
      newUser
    );
  }
  public loginUse(loginUser: LoginUser): Observable<ResponseLogin> {
    return this.http.post<ResponseLogin>(`${this.apiUrl}auth/login`, loginUser);
  }
  public decodeToken(): UserDecoded {
    const token = localStorage.getItem('token');
    const decodedToken: UserDecoded = this.jwtHelper.decodeToken(token!)!;
    return decodedToken;
  }
}
