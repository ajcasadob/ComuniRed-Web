import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../interfaces/reserva.interface';
import { Incidencia } from '../../interfaces/incidencia.interface';
import { Comunicacion } from '../../interfaces/comunicacion.interface';
import { Estadisticas, OcupacionInstalacion } from '../../interfaces/dashboard.interface';
import { ReservaService } from '../../services/reserva-service';
import { IncidenciaService } from '../../services/incidencia-service';
import { ComunicacionService } from '../../services/comunicacion-service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../../services/dashboard-service';

@Component({
  selector: 'app-panel-control-admin',
  imports: [CommonModule, RouterModule],
  templateUrl: './panel-control-admin.page.html',
  styleUrls: ['./panel-control-admin.page.css'],
})
export class PanelControlAdminPage implements OnInit {

  // Estadísticas desde backend
  estadisticas: Estadisticas | null = null;
  
  // Datos completos desde servicios existentes
  reservas: Reserva[] = [];
  incidencias: Incidencia[] = [];
  comunicaciones: Comunicacion[] = [];
  instalaciones: OcupacionInstalacion[] = [];
  
  nombreUsuario: string = '';
  cargando: boolean = true;

  constructor(
    private reservaService: ReservaService,
    private incidenciaService: IncidenciaService,
    private comunicacionService: ComunicacionService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
    this.obtenerNombreUsuario();
  }

  cargarDatos(): void {
    forkJoin({
      estadisticas: this.dashboardService.getEstadisticas(),
      reservas: this.reservaService.getAllReservas(),
      incidencias: this.incidenciaService.getAllIncidencias(),
      comunicaciones: this.comunicacionService.getAllComunicaciones()
    }).subscribe({
      next: (data) => {
        this.estadisticas = data.estadisticas;
        this.reservas = data.reservas;
        this.incidencias = data.incidencias;
        this.comunicaciones = data.comunicaciones;
        this.instalaciones = data.estadisticas.ocupacion_instalaciones;
        this.cargando = false;
        console.log('Dashboard cargado:', data);
      },
      error: (error) => {
        console.error('Error al cargar datos del dashboard:', error);
        this.cargando = false;
      }
    });
  }

  obtenerNombreUsuario(): void {
    const user = localStorage.getItem('user_name');
    this.nombreUsuario = user || 'Admin';
  }

  // ========== ESTADÍSTICAS (desde backend) ==========

  getReservasActivas(): number {
    return this.estadisticas?.reservas_activas ?? 0;
  }

  getIncidenciasPendientes(): number {
    return this.estadisticas?.incidencias_pendientes ?? 0;
  }

  getIncidenciasUrgentes(): number {
    return this.estadisticas?.incidencias_urgentes ?? 0;
  }

  getTasaCobro(): number {
    return this.estadisticas?.tasa_cobro ?? 0;
  }

  getVecinosRegistrados(): number {
    return this.estadisticas?.vecinos_registrados ?? 0;
  }

  getOcupacionInstalacion(clave: string): number {
    const instalacion = this.instalaciones.find(i => i.clave === clave);
    return instalacion?.porcentaje ?? 0;
  }

  // ========== PRÓXIMAS RESERVAS (filtrado local) ==========

  getProximasReservas(): Reserva[] {
    const hoy = new Date();
    return this.reservas
      .filter(r => {
        const fechaReserva = new Date(r.fecha_reserva);
        return fechaReserva >= hoy && r.estado !== 'cancelada';
      })
      .sort((a, b) => new Date(a.fecha_reserva).getTime() - new Date(b.fecha_reserva).getTime())
      .slice(0, 3);
  }

  formatearFechaReserva(reserva: Reserva): string {
    const fecha = new Date(reserva.fecha_reserva);
    const hoy = new Date();
    const manana = new Date(hoy);
    manana.setDate(hoy.getDate() + 1);

    if (fecha.toDateString() === hoy.toDateString()) {
      return `Hoy, ${reserva.hora_inicio}`;
    } else if (fecha.toDateString() === manana.toDateString()) {
      return `Mañana, ${reserva.hora_inicio}`;
    } else {
      const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      return `${dias[fecha.getDay()]}, ${reserva.hora_inicio}`;
    }
  }

  getNombreUsuarioReserva(reserva: Reserva): string {
    return reserva.usuario?.name || 'Usuario';
  }

  // ========== INCIDENCIAS RECIENTES (filtrado local) ==========

  getIncidenciasRecientes(): Incidencia[] {
    return this.incidencias
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 3);
  }

  getEstadoBadgeIncidencia(estado: string): string {
    switch(estado.toLowerCase()) {
      case 'resuelta': 
      case 'resuelto': 
        return 'bg-success';
      case 'en proceso': 
      case 'en_proceso': 
        return 'bg-primary';
      case 'pendiente': 
        return 'bg-warning';
      default: 
        return 'bg-secondary';
    }
  }

  getPrioridadTexto(incidencia: Incidencia): string {
    return incidencia.categoria || 'media';
  }

  // ========== COMUNICACIONES IMPORTANTES (filtrado local) ==========

  getComunicacionesImportantes(): Comunicacion[] {
    return this.comunicaciones
      .filter(c => c.activa)
      .sort((a, b) => new Date(b.fecha_publicacion).getTime() - new Date(a.fecha_publicacion).getTime())
      .slice(0, 2);
  }

  getTipoBadgeComunicacion(tipo: string): string {
    switch(tipo.toLowerCase()) {
      case 'evento': return 'bg-dark';
      case 'mantenimiento': return 'bg-primary';
      case 'aviso': return 'bg-warning';
      case 'urgente': return 'bg-danger';
      case 'general': return 'bg-info';
      default: return 'bg-secondary';
    }
  }
}
