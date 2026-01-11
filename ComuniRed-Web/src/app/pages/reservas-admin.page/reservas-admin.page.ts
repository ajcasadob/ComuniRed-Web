import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from "@angular/router";
import { ReservaService } from '../../services/reserva-service';
import { Reserva } from '../../interfaces/reserva.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservas-admin.page',
  imports: [CommonModule,RouterModule],
  templateUrl: './reservas-admin.page.html',
  styleUrl: './reservas-admin.page.css',
})
export class ReservasAdminPage implements OnInit {

   reservas: Reserva[] = [];

  instalaciones = [
    { nombre: 'Pista de Pádel 1', icono: 'bi-trophy' },
    { nombre: 'Pista de Pádel 2', icono: 'bi-trophy' },
    { nombre: 'Mesa de Ping Pong', icono: 'bi-record-circle' },
    { nombre: 'Sala Gourmet', icono: 'bi-egg-fried' },
    { nombre: 'Gimnasio', icono: 'bi-heart-pulse-fill' },
  ];

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.reservaService.getAllReservas().subscribe({
      next: (data) => {
        this.reservas = data;
        console.log('Reservas cargadas:', this.reservas);
      },
      error: (error) => {
        console.error('Error al cargar reservas:', error);
      },
    });
  }

  cancelarReserva(id: number): void {
    if (confirm('¿Estás seguro de cancelar esta reserva?')) {
      this.reservaService.deleteReserva(id).subscribe({
        next: () => {
          this.cargarReservas();
          alert('Reserva cancelada correctamente');
        },
        error: (error) => {
          console.error('Error al cancelar reserva:', error);
          alert('Error al cancelar la reserva');
        },
      });
    }
  }

  formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES');
  }

  getNombreUsuario(reserva: Reserva): string {
    return reserva.usuario?.name || 'Usuario desconocido';
  }

  getViviendaUsuario(reserva: Reserva): string {
    return reserva.usuario?.vivienda?.numero_vivienda || '-';
  }

}
