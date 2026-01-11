import { Component, OnInit } from '@angular/core';
import { Pago } from '../../interfaces/pago.interface';
import { PagoService } from '../../services/pago-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pagos-admin.page',
  imports: [CommonModule,RouterModule],
  templateUrl: './pagos-admin.page.html',
  styleUrl: './pagos-admin.page.css',
})
export class PagosAdminPage implements OnInit {

    pagos: Pago[] = [];

  constructor(private pagoService: PagoService) {}

  ngOnInit(): void {
    this.cargarPagos();
  }

  cargarPagos(): void {
    this.pagoService.getAllPagos().subscribe({
      next: (data) => {
        this.pagos = data;
        console.log('Pagos cargados:', this.pagos);
      },
      error: (error) => {
        console.error('Error al cargar pagos:', error);
      },
    });
  }

  eliminarPago(id: number): void {
    if (confirm('¿Estás seguro de eliminar este pago?')) {
      this.pagoService.deletePago(id).subscribe({
        next: () => {
          this.cargarPagos();
          alert('Pago eliminado correctamente');
        },
        error: (error) => {
          console.error('Error al eliminar pago:', error);
          alert('Error al eliminar el pago');
        },
      });
    }
  }

  formatearFecha(fecha: string | null): string {
    if (!fecha) return '-';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES');
  }

  formatearImporte(importe: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(importe);
  }

  getVivienda(pago: Pago): string {
    return pago.vivienda?.numero_vivienda || '-';
  }

  // Calcular total recaudado (pagos con estado "pagado")
  getTotalRecaudado(): number {
    return this.pagos
      .filter(p => p.estado === 'pagado')
      .reduce((sum, pago) => sum + Number(pago.importe), 0);
  }

  // Calcular pendiente de cobro (estados: pendiente + retrasado)
  getPendienteCobro(): number {
    return this.pagos
      .filter(p => p.estado === 'pendiente' || p.estado === 'retrasado')
      .reduce((sum, pago) => sum + Number(pago.importe), 0);
  }

  // Calcular tasa de cobro (porcentaje)
  getTasaCobro(): number {
    const total = this.pagos.reduce((sum, pago) => sum + Number(pago.importe), 0);
    const recaudado = this.getTotalRecaudado();
    return total > 0 ? (recaudado / total) * 100 : 0;
  }

  // Verificar si el pago está vencido
  isVencido(pago: Pago): boolean {
    if (pago.estado === 'pagado') return false;
    const hoy = new Date();
    const vencimiento = new Date(pago.fecha_vencimiento);
    return vencimiento < hoy;
  }

  // Obtener clase del badge según estado
  getEstadoBadgeClass(pago: Pago): string {
    if (pago.estado === 'pagado') return 'bg-dark';
    if (this.isVencido(pago)) return 'bg-danger';
    if (pago.estado === 'pendiente') return 'bg-secondary text-dark';
    return 'bg-secondary';
  }

  // Obtener texto del estado
  getEstadoTexto(pago: Pago): string {
    if (pago.estado === 'pagado') return 'Pagado';
    if (this.isVencido(pago)) return 'Vencido';
    if (pago.estado === 'pendiente') return 'Pendiente';
    return pago.estado;
  }

}
