import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../../services/comunicacion-service';
import { Comunicacion } from '../../interfaces/comunicacion.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comunicaciones-admin.page',
  imports: [CommonModule],
  templateUrl: './comunicaciones-admin.page.html',
  styleUrl: './comunicaciones-admin.page.css',
})
export class ComunicacionesAdminPage implements OnInit{


  comunicaciones: Comunicacion[] = [];

  constructor(
    private comunicacionService: ComunicacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarComunicaciones();
  }

  cargarComunicaciones(): void {
    this.comunicacionService.getAllComunicaciones().subscribe(
      (data) => {
        this.comunicaciones = data;
      },
      (error) => {
        console.error('Error al cargar comunicaciones:', error);
        alert('Error al cargar las comunicaciones');
      }
    );
  }

  getBadgeClass(tipo: string): string {
    const tipoLower = tipo.toLowerCase();
    if (tipoLower === 'evento') return 'bg-dark';
    if (tipoLower === 'mantenimiento') return 'bg-secondary';
    if (tipoLower === 'general') return 'bg-info text-dark';
    return 'bg-primary';
  }

  nuevaComunicacion(): void {
    this.router.navigate(['/comunicacion-form']);
  }

  editarComunicacion(id: number): void {
    this.router.navigate(['/comunicacion-form', id]);
  }

  eliminarComunicacion(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta comunicación?')) {
      this.comunicacionService.deleteComunicacion(id).subscribe(
        () => {
          alert('Comunicación eliminada correctamente');
          this.cargarComunicaciones();
        },
        (error) => {
          console.error('Error al eliminar comunicación:', error);
          alert('Error al eliminar la comunicación');
        }
      );
    }
  }

 

}
