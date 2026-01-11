import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IncidenciaService } from '../../services/incidencia-service';
import { Incidencia } from '../../interfaces/incidencia.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incidencias-admin.page',
  imports: [CommonModule],
  templateUrl: './incidencias-admin.page.html',
  styleUrl: './incidencias-admin.page.css',
})
export class IncidenciasAdminPage implements OnInit {


 incidencias: Incidencia[] = [];
  incidenciasPendientes: number = 0;
  incidenciasEnProceso: number = 0;
  incidenciasResueltas: number = 0;

  constructor(
    private incidenciaService: IncidenciaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarIncidencias();
  }

  cargarIncidencias(): void {
    this.incidenciaService.getAllIncidencias().subscribe(
      (data) => {
        this.incidencias = data;
        this.calcularEstadisticas();
      },
      (error) => {
        console.error('Error al cargar incidencias:', error);
        alert('Error al cargar las incidencias');
      }
    );
  }

  calcularEstadisticas(): void {
    this.incidenciasPendientes = this.incidencias.filter(
      (i) => i.estado.toLowerCase() === 'pendiente'
    ).length;
    this.incidenciasEnProceso = this.incidencias.filter(
      (i) => i.estado.toLowerCase() === 'en proceso'
    ).length;
    this.incidenciasResueltas = this.incidencias.filter(
      (i) => i.estado.toLowerCase() === 'resuelta' || i.estado.toLowerCase() === 'resuelto'
    ).length;
  }

  getBadgeClass(estado: string): string {
    const estadoLower = estado.toLowerCase();
    if (estadoLower === 'pendiente') return 'bg-warning';
    if (estadoLower === 'en proceso') return 'bg-primary';
    if (estadoLower === 'resuelta' || estadoLower === 'resuelto') return 'bg-success';
    return 'bg-secondary';
  }

  getIconClass(estado: string): string {
    const estadoLower = estado.toLowerCase();
    if (estadoLower === 'pendiente') return 'text-warning';
    if (estadoLower === 'en proceso') return 'text-primary';
    if (estadoLower === 'resuelta' || estadoLower === 'resuelto') return 'text-success';
    return 'text-secondary';
  }

  nuevaIncidencia(): void {
    this.router.navigate(['/incidencia-form']);
  }

  editarIncidencia(id: number): void {
    this.router.navigate(['/incidencia-form', id]);
  }

  eliminarIncidencia(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta incidencia?')) {
      this.incidenciaService.deleteIncidencia(id).subscribe(
        () => {
          alert('Incidencia eliminada correctamente');
          this.cargarIncidencias();
        },
        (error) => {
          console.error('Error al eliminar incidencia:', error);
          alert('Error al eliminar la incidencia');
        }
      );
    }
  }

}
