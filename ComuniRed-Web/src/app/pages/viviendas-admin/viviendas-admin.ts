import { Component, OnInit } from '@angular/core';
import { Vivienda } from '../../interfaces/vivienda.interface';
import { ViviendaService } from '../../services/vivienda-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-viviendas-admin',
  imports: [CommonModule,RouterLink],
  templateUrl: './viviendas-admin.html',
  styleUrl: './viviendas-admin.css',
})
export class ViviendasAdmin implements OnInit {

  listaViviendas : Vivienda []= [];
  cargando: boolean = true;

  constructor(private viviendaService: ViviendaService){}

  ngOnInit(): void {
    this.cargarViviendas();
  }

   cargarViviendas(): void {
    this.cargando = true;
    this.viviendaService.getAllViviendas().subscribe({
      next: (resp) => {
        this.listaViviendas = resp;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar viviendas:', error);
        alert('Error al cargar las viviendas');
        this.cargando = false;
      }
    });
  }

  eliminarVivienda(id: number, numero: string): void {
    if (confirm(`¿Estás seguro de eliminar la vivienda ${numero}?`)) {
      this.viviendaService.deleteVivienda(id).subscribe({
        next: () => {
          alert('Vivienda eliminada correctamente');
          this.cargarViviendas();
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
          alert('Error al eliminar la vivienda');
        }
      });
    }
  }

  contarPisos(): number {
    return this.listaViviendas.filter(v => v.tipo === 'piso').length;
  }

  contarLocales(): number {
    return this.listaViviendas.filter(v => v.tipo === 'local').length;
  }

  contarGarajes(): number {
    return this.listaViviendas.filter(v => v.tipo === 'garaje').length;
  }

  getTipoBadgeClass(tipo: string): string {
    switch(tipo) {
      case 'piso': return 'badge bg-primary';
      case 'local': return 'badge bg-warning text-dark';
      case 'garaje': return 'badge bg-secondary';
      default: return 'badge bg-secondary';
    }
  }



}
