import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { PanelControlAdminPage } from './pages/panel-control-admin.page/panel-control-admin.page';
import { MenuLayout } from './layouts/menu-layout/menu-layout';




@Component({
  selector: 'app-root',
  imports: [ RouterOutlet,MenuLayout],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ComuniRed-Web');

  constructor(private router: Router){}

  isAuthRoute():boolean {
    const authRoutes = ['/login','/registro'];
    return authRoutes.includes(this.router.url);
  }
}
