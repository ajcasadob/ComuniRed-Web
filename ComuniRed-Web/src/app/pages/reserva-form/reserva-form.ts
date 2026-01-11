import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReservaService } from '../../services/reserva-service';
import { ReservaDTO } from '../../dto/reserva.dto';

@Component({
  selector: 'app-reserva-form',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  standalone:true,
  templateUrl: './reserva-form.html',
  styleUrl: './reserva-form.css',
})
export class ReservaForm  implements OnInit{
  reservaForm: FormGroup;
  isEditMode = false;
  reservaId?: number;

  constructor(
    private reservaService: ReservaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.reservaForm = new FormGroup({
      nombre_espacio: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      usuario_id: new FormControl(this.getUsuarioId(), [Validators.required]),
      fecha_reserva: new FormControl('', [Validators.required]),
      hora_inicio: new FormControl('', [Validators.required]),
      hora_fin: new FormControl('', [Validators.required]),
      estado: new FormControl('pendiente', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.reservaId = +params['id'];
        this.cargarReserva();
      }
    });
  }

  cargarReserva(): void {
    if (this.reservaId) {
      this.reservaService.getReservaById(this.reservaId).subscribe({
        next: (reserva) => {
          this.reservaForm.patchValue(reserva);
        },
        error: (error) => {
          console.error('Error al cargar reserva:', error);
          alert('Error al cargar la reserva');
        },
      });
    }
  }

  onSubmit(): void {
    if (this.reservaForm.valid) {
      const reservaDTO = new ReservaDTO(
        this.reservaForm.value.nombre_espacio,
        this.reservaForm.value.usuario_id,
        this.reservaForm.value.fecha_reserva,
        this.reservaForm.value.hora_inicio,
        this.reservaForm.value.hora_fin,
        this.reservaForm.value.estado
      );

      if (this.isEditMode && this.reservaId) {
        this.reservaService.updateReserva(this.reservaId, reservaDTO).subscribe({
          next: () => {
            alert('Reserva actualizada correctamente');
            this.router.navigate(['/reservas-admin']);
          },
          error: (error) => {
            console.error('Error al actualizar reserva:', error);
            alert('Error al actualizar la reserva');
          },
        });
      } else {
        this.reservaService.createReserva(reservaDTO).subscribe({
          next: () => {
            alert('Reserva creada correctamente');
            this.router.navigate(['/reservas-admin']);
          },
          error: (error) => {
            console.error('Error al crear reserva:', error);
            alert('Error al crear la reserva');
          },
        });
      }
    } else {
      alert('Por favor completa todos los campos requeridos');
    }
  }

  private getUsuarioId(): number {
    const userId = localStorage.getItem('user_id');
    return userId ? parseInt(userId) : 1;
  }

}
