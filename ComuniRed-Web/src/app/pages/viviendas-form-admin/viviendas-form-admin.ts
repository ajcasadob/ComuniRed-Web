import { Component, OnInit } from '@angular/core';
import { ViviendaService } from '../../services/vivienda-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viviendas-form-admin',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './viviendas-form-admin.html',
  styleUrl: './viviendas-form-admin.css',
})
export class ViviendasFormAdmin implements OnInit {

  viviendaId: number | null = null;
  modoEdicion: boolean = false;
  cargando: boolean = false;

  viviendaForm = new FormGroup({
    numero_vivienda: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    bloque: new FormControl('', [Validators.maxLength(10)]),
    piso: new FormControl('', [Validators.maxLength(10)]),
    puerta: new FormControl('', [Validators.maxLength(10)]),
    metros_cuadrados: new FormControl<number | null>(null, [Validators.min(0)]),
    tipo: new FormControl<'piso' | 'local' | 'garaje'>('piso', [Validators.required])
  });

  constructor(
    private viviendaService: ViviendaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.viviendaId = +id;
      this.modoEdicion = true;
      this.cargarVivienda(+id);
    }
  }

  cargarVivienda(id: number): void {
    this.cargando = true;
    this.viviendaService.getViviendaById(id).subscribe({
      next: (vivienda) => {
        this.viviendaForm.patchValue({
          numero_vivienda: vivienda.numero_vivienda,
          bloque: vivienda.bloque,
          piso: vivienda.piso,
          puerta: vivienda.puerta,
          metros_cuadrados: vivienda.metros_cuadrados,
          tipo: vivienda.tipo as 'piso' | 'local' | 'garaje'
        });
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar vivienda:', error);
        alert('Error al cargar la vivienda');
        this.router.navigate(['/viviendas']);
      }
    });
  }

 guardarVivienda(): void {
  if (this.viviendaForm.invalid) {
    alert('Por favor completa todos los campos requeridos');
    return;
  }

  this.cargando = true;
  
  // Extraer los valores del formulario correctamente
  const viviendaData = {
    numero_vivienda: this.viviendaForm.get('numero_vivienda')?.value || '',
    bloque: this.viviendaForm.get('bloque')?.value || null,
    piso: this.viviendaForm.get('piso')?.value || null,
    puerta: this.viviendaForm.get('puerta')?.value || null,
    metros_cuadrados: this.viviendaForm.get('metros_cuadrados')?.value || null,
    tipo: this.viviendaForm.get('tipo')?.value as 'piso' | 'local' | 'garaje'
  };

  if (this.modoEdicion && this.viviendaId) {
    // Actualizar
    this.viviendaService.updateVivienda(this.viviendaId, viviendaData).subscribe({
      next: () => {
        alert('Vivienda actualizada correctamente');
        this.router.navigate(['/viviendas']);
      },
      error: (error) => {
        console.error('Error al actualizar:', error);
        alert('Error al actualizar la vivienda');
        this.cargando = false;
      }
    });
  } else {
    // Crear
    this.viviendaService.createVivienda(viviendaData).subscribe({
      next: () => {
        alert('Vivienda creada correctamente');
        this.router.navigate(['/viviendas']);
      },
      error: (error) => {
        console.error('Error al crear:', error);
        alert('Error al crear la vivienda');
        this.cargando = false;
      }
    });
  }
}


  cancelar(): void {
    this.router.navigate(['/viviendas']);
  }

}
