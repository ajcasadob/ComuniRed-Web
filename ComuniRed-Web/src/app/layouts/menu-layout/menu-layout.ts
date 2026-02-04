import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu-layout',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu-layout.html',
  styleUrl: './menu-layout.css',
})
export class MenuLayout {

  constructor(private router: Router) {}

  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
