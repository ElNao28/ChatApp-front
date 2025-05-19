import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';

import { StatusBar } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  standalone: false,
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  private async initializeApp() {
    await this.platform.ready();

    if (Capacitor.getPlatform() !== 'web') {
      await StatusBar.setOverlaysWebView({ overlay: false });
    }
  }
}
