import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from "./menu/menu";
import { PanelControlAdminPage } from './pages/panel-control-admin.page/panel-control-admin.page';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu,PanelControlAdminPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ComuniRed-Web');
}
