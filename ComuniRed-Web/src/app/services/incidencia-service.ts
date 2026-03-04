import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Incidencia, IncidenciaResponse } from '../interfaces/incidencia.interface';
import { IncidenciaDTO } from '../dto/incidencia.dto';

@Injectable({
  providedIn: 'root',
})
export class IncidenciaService {

   URL_BASE = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getAllIncidencias(): Observable<Incidencia[]> {
    return this.http.get<Incidencia[]>(`${this.URL_BASE}/incidencias`);
  }

  getIncidenciaById(id: number): Observable<Incidencia> {
    return this.http.get<Incidencia>(`${this.URL_BASE}/incidencias/${id}`);
  }

  createIncidencia(incidencia: IncidenciaDTO): Observable<IncidenciaResponse> {
    const formData = this.toFormData(incidencia);
    return this.http.post<IncidenciaResponse>(`${this.URL_BASE}/incidencias`, formData);
  }

  updateIncidencia(id: number, incidencia: IncidenciaDTO): Observable<IncidenciaResponse> {
    const formData = this.toFormData(incidencia);
    // Laravel requiere POST + _method=PUT para subida de archivos
    formData.append('_method', 'PUT');
    return this.http.post<IncidenciaResponse>(`${this.URL_BASE}/incidencias/${id}`, formData);
  }

  private toFormData(incidencia: IncidenciaDTO): FormData {
    const formData = new FormData();
    formData.append('titulo', incidencia.titulo);
    formData.append('descripcion', incidencia.descripcion);
    formData.append('ubicacion', incidencia.ubicacion);
    formData.append('categoria', incidencia.categoria);
    formData.append('prioridad', incidencia.prioridad);
    formData.append('estado', incidencia.estado);
    formData.append('usuario_id', incidencia.usuario_id.toString());
    if (incidencia.vivienda_id != null) {
      formData.append('vivienda_id', incidencia.vivienda_id.toString());
    }
    if (incidencia.fecha_resolucion) {
      formData.append('fecha_resolucion', incidencia.fecha_resolucion);
    }
    if (incidencia.foto instanceof File) {
      formData.append('foto', incidencia.foto);
    }
    return formData;
  }

  deleteIncidencia(id: number): Observable<any> {
    return this.http.delete(`${this.URL_BASE}/incidencias/${id}`);
  }
  
}
