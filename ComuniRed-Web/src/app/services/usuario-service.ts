import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  URL_BASE = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getAllUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.URL_BASE}/usuarios`);
  }

  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.URL_BASE}/usuarios/${id}`);
  }

  updateUsuario(id: number, usuario: Partial<Usuario>): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.URL_BASE}/usuarios/${id}`, usuario);
  }

  asignarVivienda(usuarioId: number, viviendaId: number | null): Observable<Usuario> {
    return this.http.patch<Usuario>(
      `${this.URL_BASE}/usuarios/${usuarioId}/asignarvivienda`,
      { vivienda_id: viviendaId }
    );
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.URL_BASE}/usuarios/${id}`);
  }
  
}
