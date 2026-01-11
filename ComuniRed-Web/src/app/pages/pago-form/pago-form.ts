import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Vivienda } from '../../interfaces/vivienda.interface';
import { PagoService } from '../../services/pago-service';
import { HttpClient } from '@angular/common/http';
import { PagoDTO } from '../../dto/pago.dto';

@Component({
  selector: 'app-pago-form',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  standalone:true,
  templateUrl: './pago-form.html',
  styleUrl: './pago-form.css',
})
export class PagoForm implements OnInit {

  pagoForm: FormGroup;
  isEditMode = false;
  pagoId?: number;
  viviendas: Vivienda[] = [];

  constructor(
    private pagoService: PagoService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.pagoForm = new FormGroup({
      vivienda_id: new FormControl('', [Validators.required]),
      concepto: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      periodo: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      importe: new FormControl('', [Validators.required, Validators.min(0)]),
      estado: new FormControl('pendiente', [Validators.required]),
      fecha_vencimiento: new FormControl('', [Validators.required]),
      fecha_pago: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.cargarViviendas();
    
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.pagoId = +params['id'];
        this.cargarPago();
      }
    });
  }

  cargarViviendas(): void {
    this.http.get<Vivienda[]>('http://127.0.0.1:8000/api/viviendas').subscribe({
      next: (data) => {
        this.viviendas = data;
      },
      error: (error) => {
        console.error('Error al cargar viviendas:', error);
      },
    });
  }

  cargarPago(): void {
    if (this.pagoId) {
      this.pagoService.getPagoById(this.pagoId).subscribe({
        next: (pago) => {
          this.pagoForm.patchValue(pago);
        },
        error: (error) => {
          console.error('Error al cargar pago:', error);
          alert('Error al cargar el pago');
        },
      });
    }
  }

  onSubmit(): void {
    if (this.pagoForm.valid) {
      const pagoDTO = new PagoDTO(
        this.pagoForm.value.vivienda_id,
        this.pagoForm.value.concepto,
        this.pagoForm.value.periodo,
        this.pagoForm.value.importe,
        this.pagoForm.value.estado,
        this.pagoForm.value.fecha_vencimiento,
        this.pagoForm.value.fecha_pago || null
      );

      if (this.isEditMode && this.pagoId) {
        this.pagoService.updatePago(this.pagoId, pagoDTO).subscribe({
          next: () => {
            alert('Pago actualizado correctamente');
            this.router.navigate(['/pagos-admin']);
          },
          error: (error) => {
            console.error('Error al actualizar pago:', error);
            alert('Error al actualizar el pago');
          },
        });
      } else {
        this.pagoService.createPago(pagoDTO).subscribe({
          next: () => {
            alert('Pago creado correctamente');
            this.router.navigate(['/pagos-admin']);
          },
          error: (error) => {
            console.error('Error al crear pago:', error);
            alert('Error al crear el pago');
          },
        });
      }
    } else {
      alert('Por favor completa todos los campos requeridos');
    }
  }

}
