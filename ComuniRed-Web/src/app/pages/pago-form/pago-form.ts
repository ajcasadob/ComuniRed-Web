import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Vivienda } from '../../interfaces/vivienda.interface';
import { PagoService } from '../../services/pago-service';

import { PagoDTO } from '../../dto/pago.dto';
import { ViviendaService } from '../../services/vivienda-service';

@Component({
  selector: 'app-pago-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  standalone: true,
  templateUrl: './pago-form.html',
  styleUrl: './pago-form.css',
})
export class PagoForm implements OnInit {

  pagoForm = new FormGroup({
    vivienda_id: new FormControl<number | null>(null, [Validators.required]),
    concepto: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    periodo: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    importe: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    estado: new FormControl('pendiente', [Validators.required]),
    fecha_vencimiento: new FormControl('', [Validators.required]),
    fecha_pago: new FormControl(''),
  });

  pagoId: number | null = null;
  viviendas: Vivienda[] = [];

  get isEditMode(): boolean {
    return this.pagoId !== null;
  }

  constructor(
    private pagoService: PagoService,
    private viviendaService: ViviendaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarViviendas();
    
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.pagoId = +id;
      this.cargarPago();
    }
  }

  cargarViviendas(): void {
    this.viviendaService.getAllViviendas().subscribe({
      next: (data) => this.viviendas = data,
      error: () => console.error('Error al cargar viviendas')
    });
  }

  cargarPago(): void {
    if (this.pagoId) {
      this.pagoService.getPagoById(this.pagoId).subscribe({
        next: (pago) => this.pagoForm.patchValue(pago),
        error: () => {
          alert('Error al cargar el pago');
          this.router.navigate(['/pagos-admin']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.pagoForm.invalid) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    const { vivienda_id, concepto, periodo, importe, estado, fecha_vencimiento, fecha_pago } = this.pagoForm.value;
    const pagoDTO = new PagoDTO(
      vivienda_id!,
      concepto!,
      periodo!,
      importe!,
      estado!,
      fecha_vencimiento!,
      fecha_pago || null
    );

    const operacion = this.pagoId
      ? this.pagoService.updatePago(this.pagoId, pagoDTO)
      : this.pagoService.createPago(pagoDTO);

    operacion.subscribe({
      next: () => this.router.navigate(['/pagos-admin']),
      error: () => alert('Error al guardar el pago')
    });
  }
}
