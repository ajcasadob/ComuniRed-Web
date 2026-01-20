import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../interfaces/reserva.interface';
import { Incidencia } from '../../interfaces/incidencia.interface';
import { Pago } from '../../interfaces/pago.interface';
import { Comunicacion } from '../../interfaces/comunicacion.interface';
import { ReservaService } from '../../services/reserva-service';
import { IncidenciaService } from '../../services/incidencia-service';
import { PagoService } from '../../services/pago-service';
import { ComunicacionService } from '../../services/comunicacion-service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-panel-control-admin',
  imports: [CommonModule, RouterModule],
  templateUrl: './panel-control-admin.page.html',
  styleUrls: ['./panel-control-admin.page.css'],
})
export class PanelControlAdminPage implements OnInit {

  reservas: Reserva[] = [];
  incidencias: Incidencia[] = [];
  pagos: Pago[] = [];
  comunicaciones: Comunicacion[] = [];
  
  nombreUsuario: string = '';
  cargando: boolean = true;

  constructor(
    private reservaService: ReservaService,
    private incidenciaService: IncidenciaService,
    private pagoService: PagoService,
    private comunicacionService: ComunicacionService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
    this.obtenerNombreUsuario();
  }

  cargarDatos(): void {
    forkJoin({
      reservas: this.reservaService.getAllReservas(),
      incidencias: this.incidenciaService.getAllIncidencias(),
      pagos: this.pagoService.getAllPagos(),
      comunicaciones: this.comunicacionService.getAllComunicaciones()
    }).subscribe({
      next: (data) => {
        this.reservas = data.reservas;
        this.incidencias = data.incidencias;
        this.pagos = data.pagos;
        this.comunicaciones = data.comunicaciones;
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

  // ========== ESTADÍSTICAS ==========

  getReservasActivas(): number {
    const hoy = new Date();
    return this.reservas.filter(r => {
      const fechaReserva = new Date(r.fecha_reserva);
      return fechaReserva >= hoy && (r.estado === 'confirmada' || r.estado === 'pendiente');
    }).length;
  }

  getIncidenciasPendientes(): number {
    return this.incidencias.filter(i => i.estado === 'pendiente' || i.estado === 'en_proceso').length;
  }

  getIncidenciasUrgentes(): number {
    return this.incidencias.filter(i => 
      (i.estado === 'pendiente' || i.estado === 'en_proceso') && 
      (i.categoria === 'urgente' || i.categoria === 'alta')
    ).length;
  }

  getTasaCobro(): number {
    const total = this.pagos.reduce((sum, p) => sum + Number(p.importe), 0);
    const pagado = this.pagos
      .filter(p => p.estado === 'pagado')
      .reduce((sum, p) => sum + Number(p.importe), 0);
    return total > 0 ? (pagado / total) * 100 : 0;
  }

  getVecinosRegistrados(): number {
    return 48;
  }

  // ========== PRÓXIMAS RESERVAS ==========

  getProximasReservas(): Reserva[] {
    const hoy = new Date();
    return this.reservas
      .filter(r => {
        const fechaReserva = new Date(r.fecha_reserva);
        return fechaReserva >= hoy && r.estado === 'confirmada';
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

  // ========== INCIDENCIAS RECIENTES ==========

  getIncidenciasRecientes(): Incidencia[] {
    return this.incidencias
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 3);
  }

  getEstadoBadgeIncidencia(estado: string): string {
    switch(estado.toLowerCase()) {
      case 'resuelta': return 'bg-success';
      case 'en_proceso': return 'bg-secondary';
      case 'pendiente': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  getPrioridadTexto(incidencia: Incidencia): string {
    return incidencia.categoria || 'media';
  }

  // ========== COMUNICACIONES IMPORTANTES ==========

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
      default: return 'bg-secondary';
    }
  }

  // ========== OCUPACIÓN DE INSTALACIONES ==========

  getOcupacionInstalacion(nombreInstalacion: string): number {
    const totalReservas = this.reservas.filter(r => 
      r.nombre_espacio.toLowerCase().includes(nombreInstalacion.toLowerCase())
    ).length;
    
    const slotsDisponibles = 10;
    return totalReservas > 0 ? Math.min((totalReservas / slotsDisponibles) * 100, 100) : 0;
  }

  instalaciones = [
    { nombre: 'Pistas de Pádel', clave: 'padel' },
    { nombre: 'Gimnasio', clave: 'gimnasio' },
    { nombre: 'Sala Gourmet', clave: 'gourmet' },
    { nombre: 'Mesa Ping Pong', clave: 'ping pong' }
  ];

}
