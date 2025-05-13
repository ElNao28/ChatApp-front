import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HandlerResponse } from '../utils/Handler-response.util';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.API_URL;
  public getAllContacts(): Observable<HandlerResponse<User[]>> {
    return this.http.get<HandlerResponse<User[]>>(`${this.apiUrl}user/all`);
  }
}
