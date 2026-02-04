import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuario.interface';
import { UsuarioService } from '../../services/usuario-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuarios-admin',
  imports: [CommonModule,RouterLink],
  templateUrl: './usuarios-admin.html',
  styleUrl: './usuarios-admin.css',
})
export class UsuariosAdmin implements OnInit{

    listaUsuarios: Usuario[] = [];
    cargando: boolean = true;

    constructor(private usuarioService: UsuarioService){}

  ngOnInit(): void {
    this.cargarUsuarios();
  }
  cargarUsuarios(): void {
    this.cargando = true;
    this.usuarioService.getAllUsuarios().subscribe({
      next: (resp) => {
        this.listaUsuarios = resp;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
        alert('Error al cargar los usuarios');
        this.cargando = false;
      }
    });
  }

  eliminarUsuario(id: number, nombre: string): void {
    if (confirm(`¿Estás seguro de eliminar al usuario ${nombre}?`)) {
      this.usuarioService.deleteUsuario(id).subscribe({
        next: () => {
          alert('Usuario eliminado correctamente');
          this.cargarUsuarios();
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
          alert('Error al eliminar el usuario');
        }
      });
    }
  }

  contarAdmin(): number {
    return this.listaUsuarios.filter(u => u.role === 'admin').length;
  }

  contarUsuarios(): number {
    return this.listaUsuarios.filter(u => u.role === 'user').length;
  }


  getRoleBadgeClass(role: string): string {
    switch(role) {
      case 'admin': return 'badge bg-danger';
      case 'user': return 'badge bg-primary';
      default: return 'badge bg-secondary';
    }
  }

}
