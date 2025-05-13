import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment.prod';
import { WebSocketService } from './services/web-socket.service';
import { ngrokInterceptor } from './interceptors/ngrok.interceptor';

const config: SocketIoConfig = {
  url: environment.WS_URL,
  options: {
    query: {
      'ngrok-skip-browser-warning': 'true',
    },
    transports: ['websocket'],
  },
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(withInterceptors([ngrokInterceptor])),
    JwtHelperService,
    WebSocketService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
