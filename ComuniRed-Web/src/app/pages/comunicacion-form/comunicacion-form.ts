import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComunicacionService } from '../../services/comunicacion-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ComunicacionDTO } from '../../dto/comunicacion.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comunicacion-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './comunicacion-form.html',
  styleUrl: './comunicacion-form.css',
})
export class ComunicacionForm implements OnInit {

  comunicacionForm = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    contenido: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    autor_id: new FormControl(this.obtenerUsuarioId(), [Validators.required]),
    fecha_publicacion: new FormControl(new Date().toISOString().split('T')[0], [Validators.required]),
    activa: new FormControl(true, [Validators.required])
  });

  comunicacionId: number | null = null;
  tipos = ['Evento', 'Mantenimiento', 'General', 'Urgente', 'Aviso'];

  get isEditMode(): boolean {
    return this.comunicacionId !== null;
  }

  constructor(
    private comunicacionService: ComunicacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.comunicacionId = +id;
      this.cargarComunicacion(this.comunicacionId);
    }
  }

  obtenerUsuarioId(): number {
    const userId = localStorage.getItem('user_id');
    return userId ? parseInt(userId) : 1;
  }

  cargarComunicacion(id: number): void {
    this.comunicacionService.getComunicacionById(id).subscribe({
      next: (data) => this.comunicacionForm.patchValue(data),
      error: () => {
        alert('Error al cargar la comunicación');
        this.router.navigate(['/comunicaciones']);
      }
    });
  }

  guardarComunicacion(): void {
    if (this.comunicacionForm.invalid) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    const { titulo, contenido, tipo, autor_id, fecha_publicacion, activa } = this.comunicacionForm.value;
    const comunicacionDTO = new ComunicacionDTO(titulo!, contenido!, tipo!, autor_id!, fecha_publicacion!, activa!);

    const operacion = this.comunicacionId 
      ? this.comunicacionService.updateComunicacion(this.comunicacionId, comunicacionDTO)
      : this.comunicacionService.createComunicacion(comunicacionDTO);

    operacion.subscribe({
      next: () => this.router.navigate(['/comunicaciones']),
      error: () => alert('Error al guardar la comunicación')
    });
  }

  cancelar(): void {
    this.router.navigate(['/comunicaciones']);
  }
}
