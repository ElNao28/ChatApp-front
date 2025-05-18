import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HandlerResponse } from '../utils/Handler-response.util';
import { ChatUser } from '../interfaces/messages.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.API_URL;
  public getMessagesByUsers(data: {
    to: string;
    from: string;
  }): Observable<HandlerResponse<ChatUser>> {
    return this.http.post<HandlerResponse<ChatUser>>(
      `${this.apiUrl}messages`,
      data
    );
  }
}
