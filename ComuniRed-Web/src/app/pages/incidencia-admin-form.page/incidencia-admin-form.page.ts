import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IncidenciaService } from '../../services/incidencia-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IncidenciaDTO } from '../../dto/incidencia.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-incidencia-admin-form.page',
  imports: [ ReactiveFormsModule, CommonModule],
  standalone:true,
  templateUrl: './incidencia-admin-form.page.html',
  styleUrl: './incidencia-admin-form.page.css',
})
export class IncidenciaAdminFormPage implements OnInit {


 incidenciaForm = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    descripcion: new FormControl('', [Validators.required]),
    ubicacion: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    categoria: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    prioridad: new FormControl('media', [Validators.required]),
    estado: new FormControl('Pendiente', [Validators.required]),
    usuario_id: new FormControl(this.obtenerUsuarioId(), [Validators.required]),
    vivienda_id: new FormControl<number | null>(null),
    fecha_resolucion: new FormControl<string | null>(null),
  });

  incidenciaId: number | null = null;
  isEditMode: boolean = false;

  categorias = ['Electricidad', 'Fontanería', 'Ascensor', 'Limpieza', 'Seguridad', 'Fontaneria', 'Albanileria', 'Otro'];
  estados = ['Pendiente', 'En Proceso', 'Resuelta'];
  prioridades = ['baja', 'media', 'alta'];

  constructor(
    private incidenciaService: IncidenciaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.incidenciaId = +params['id'];
        this.isEditMode = true;
        this.cargarIncidencia(this.incidenciaId);
      }
    });
  }
  obtenerUsuarioId(): number {
  const userId = localStorage.getItem('user_id');
  return userId ? parseInt(userId) : 1; 
}


  cargarIncidencia(id: number): void {
    this.incidenciaService.getIncidenciaById(id).subscribe(
      (data) => {
        this.incidenciaForm.patchValue({
          titulo: data.titulo,
          descripcion: data.descripcion,
          ubicacion: data.ubicacion,
          categoria: data.categoria,
          prioridad: data.prioridad,
          estado: data.estado,
          usuario_id: data.usuario_id,
          vivienda_id: data.vivienda_id,
          fecha_resolucion: data.fecha_resolucion,
        });
      },
      (error) => {
        console.error('Error al cargar incidencia:', error);
        alert('Error al cargar la incidencia');
        this.router.navigate(['/incidencias']);
      }
    );
  }

  guardarIncidencia(): void {
    if (this.incidenciaForm.invalid) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    const incidenciaDTO = new IncidenciaDTO(
      this.incidenciaForm.get('titulo')?.value!,
      this.incidenciaForm.get('descripcion')?.value!,
      this.incidenciaForm.get('ubicacion')?.value!,
      this.incidenciaForm.get('categoria')?.value!,
      this.incidenciaForm.get('prioridad')?.value!,
      this.incidenciaForm.get('estado')?.value!,
      this.incidenciaForm.get('usuario_id')?.value!,
      this.incidenciaForm.get('vivienda_id')?.value,
      this.incidenciaForm.get('fecha_resolucion')?.value
    );

    if (this.isEditMode && this.incidenciaId) {
      this.incidenciaService.updateIncidencia(this.incidenciaId, incidenciaDTO).subscribe(
        () => {
          alert('Incidencia actualizada correctamente');
          this.router.navigate(['/incidencias']);
        },
        (error) => {
          console.error('Error al actualizar incidencia:', error);
          alert('Error al actualizar la incidencia');
        }
      );
    } else {
      this.incidenciaService.createIncidencia(incidenciaDTO).subscribe(
        () => {
          alert('Incidencia creada correctamente');
          this.router.navigate(['/incidencias']);
        },
        (error) => {
          console.error('Error al crear incidencia:', error);
          alert('Error al crear la incidencia');
        }
      );
    }
  }

  cancelar(): void {
    this.router.navigate(['/incidencias']);
  }
}
