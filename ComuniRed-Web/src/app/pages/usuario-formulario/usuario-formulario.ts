import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Vivienda } from '../../interfaces/vivienda.interface';
import { Usuario } from '../../interfaces/usuario.interface';
import { UsuarioService } from '../../services/usuario-service';
import { ViviendaService } from '../../services/vivienda-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario-formulario',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario-formulario.html',
  styleUrl: './usuario-formulario.css',
})
export class UsuarioFormulario implements OnInit {
  usuarioId: number | null = null;
  cargando: boolean = false;
  listaViviendas: Vivienda[] = [];
  usuarioActual: Usuario | null = null; // ← AÑADIDO

  usuarioForm = new FormGroup({
    vivienda_id: new FormControl<number | null>(null) // ← SOLO ESTE CAMPO
  });

  constructor(
    private usuarioService: UsuarioService,
    private viviendaService: ViviendaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarViviendas();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.usuarioId = +id;
      this.cargarUsuario(+id);
    }
  }

  cargarViviendas(): void {
    this.viviendaService.getAllViviendas().subscribe({
      next: (viviendas) => {
        this.listaViviendas = viviendas;
      },
      error: (error) => {
        console.error('Error al cargar viviendas:', error);
      }
    });
  }

  cargarUsuario(id: number): void {
    this.cargando = true;
    this.usuarioService.getUsuarioById(id).subscribe({
      next: (usuario) => {
        this.usuarioActual = usuario; // ← GUARDAR USUARIO COMPLETO
        this.usuarioForm.patchValue({
          vivienda_id: usuario.vivienda_id
        });
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar usuario:', error);
        alert('Error al cargar el usuario');
        this.router.navigate(['/usuarios']);
      }
    });
  }

  guardarUsuario(): void {
  this.cargando = true;
  
  const viviendaId = this.usuarioForm.get('vivienda_id')?.value ?? null;

  console.log('Asignando vivienda:', viviendaId, 'al usuario:', this.usuarioId);

  if (this.usuarioId) {
    // Usar el método específico de asignar vivienda
    this.usuarioService.asignarVivienda(this.usuarioId, viviendaId).subscribe({
      next: (response) => {
        console.log('Respuesta:', response);
        alert('Vivienda asignada correctamente');
        this.router.navigate(['/usuarios']);
      },
      error: (error) => {
        console.error('Error al actualizar:', error);
        alert('Error al asignar la vivienda');
        this.cargando = false;
      }
    });
  }
}

  cancelar(): void {
    this.router.navigate(['/usuarios']);
  }

  getRoleBadgeClass(role: string): string {
    switch(role) {
      case 'admin': return 'badge bg-danger';
      case 'user': return 'badge bg-primary';
      case 'guest': return 'badge bg-secondary';
      default: return 'badge bg-secondary';
    }
  }
}
