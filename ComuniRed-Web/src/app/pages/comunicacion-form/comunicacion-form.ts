import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComunicacionService } from '../../services/comunicacion-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ComunicacionDTO } from '../../dto/comunicacion.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comunicacion-form',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './comunicacion-form.html',
  styleUrl: './comunicacion-form.css',
})
export class ComunicacionForm implements OnInit{

  comunicacionForm = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    contenido: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    autor_id: new FormControl(this.obtenerUsuarioId(), [Validators.required]),
    fecha_publicacion: new FormControl('', [Validators.required]),
    activa: new FormControl(true, [Validators.required])
  });

  comunicacionId: number | null = null;
  isEditMode: boolean = false;

  tipos = ['Evento', 'Mantenimiento', 'General', 'Urgente', 'Aviso'];

  constructor(
    private comunicacionService: ComunicacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Establecer fecha actual por defecto
    const today = new Date().toISOString().split('T')[0];
    this.comunicacionForm.patchValue({ fecha_publicacion: today });

    // Verificar si estamos en modo edición
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.comunicacionId = +params['id'];
        this.isEditMode = true;
        this.cargarComunicacion(this.comunicacionId);
      }
    });
  }

  obtenerUsuarioId(): number {
    const userId = localStorage.getItem('user_id');
    return userId ? parseInt(userId) : 1;
  }

  cargarComunicacion(id: number): void {
    this.comunicacionService.getComunicacionById(id).subscribe(
      (data) => {
        this.comunicacionForm.patchValue({
          titulo: data.titulo,
          contenido: data.contenido,
          tipo: data.tipo,
          autor_id: data.autor_id,
          fecha_publicacion: data.fecha_publicacion,
          activa: data.activa
        });
      },
      (error) => {
        console.error('Error al cargar comunicación:', error);
        alert('Error al cargar la comunicación');
        this.router.navigate(['/comunicaciones']);
      }
    );
  }

  guardarComunicacion(): void {
    if (this.comunicacionForm.invalid) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    const comunicacionDTO = new ComunicacionDTO(
      this.comunicacionForm.get('titulo')?.value!,
      this.comunicacionForm.get('contenido')?.value!,
      this.comunicacionForm.get('tipo')?.value!,
      this.comunicacionForm.get('autor_id')?.value!,
      this.comunicacionForm.get('fecha_publicacion')?.value!,
      this.comunicacionForm.get('activa')?.value!
    );

    if (this.isEditMode && this.comunicacionId) {
      this.comunicacionService.updateComunicacion(this.comunicacionId, comunicacionDTO).subscribe(
        () => {
          alert('Comunicación actualizada correctamente');
          this.router.navigate(['/comunicaciones']);
        },
        (error) => {
          console.error('Error al actualizar comunicación:', error);
          alert('Error al actualizar la comunicación');
        }
      );
    } else {
      this.comunicacionService.createComunicacion(comunicacionDTO).subscribe(
        () => {
          alert('Comunicación creada correctamente');
          this.router.navigate(['/comunicaciones']);
        },
        (error) => {
          console.error('Error al crear comunicación:', error);
          alert('Error al crear la comunicación');
        }
      );
    }
  }

  cancelar(): void {
    this.router.navigate(['/comunicaciones']);
  }

}
