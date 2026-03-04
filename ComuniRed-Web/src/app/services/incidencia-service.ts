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
    return this.http.post<IncidenciaResponse>(`${this.URL_BASE}/incidencias`, incidencia);
  }

  updateIncidencia(id: number, incidencia: IncidenciaDTO): Observable<IncidenciaResponse> {
    return this.http.put<IncidenciaResponse>(`${this.URL_BASE}/incidencias/${id}`, incidencia);
  }

  deleteIncidencia(id: number): Observable<any> {
    return this.http.delete(`${this.URL_BASE}/incidencias/${id}`);
  }
  
}
