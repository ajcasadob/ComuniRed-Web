import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comunicacion, ComunicacionResponse } from '../interfaces/comunicacion.interface';
import { ComunicacionDTO } from '../dto/comunicacion.dto';

@Injectable({
  providedIn: 'root',
})
export class ComunicacionService {
  URL_BASE = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getAllComunicaciones(): Observable<Comunicacion[]> {
    return this.http.get<Comunicacion[]>(`${this.URL_BASE}/comunicaciones`);
  }

  getComunicacionById(id: number): Observable<Comunicacion> {
    return this.http.get<Comunicacion>(`${this.URL_BASE}/comunicaciones/${id}`);
  }

  createComunicacion(comunicacion: ComunicacionDTO): Observable<ComunicacionResponse> {
    return this.http.post<ComunicacionResponse>(`${this.URL_BASE}/comunicaciones`, comunicacion);
  }

  updateComunicacion(id: number, comunicacion: ComunicacionDTO): Observable<ComunicacionResponse> {
    return this.http.put<ComunicacionResponse>(`${this.URL_BASE}/comunicaciones/${id}`, comunicacion);
  }

  deleteComunicacion(id: number): Observable<any> {
    return this.http.delete(`${this.URL_BASE}/comunicaciones/${id}`);
  }

  
  
}
