import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vivienda, ViviendaResponse } from '../interfaces/vivienda.interface';

@Injectable({
  providedIn: 'root',
})
export class ViviendaService {
  URL_BASE = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getAllViviendas(): Observable<Vivienda[]> {
    return this.http.get<Vivienda[]>(`${this.URL_BASE}/viviendas`);
  }

  getViviendaById(id: number): Observable<Vivienda> {
    return this.http.get<Vivienda>(`${this.URL_BASE}/viviendas/${id}`);
  }

  createVivienda(vivienda: Partial<Vivienda>): Observable<ViviendaResponse> {
    return this.http.post<ViviendaResponse>(`${this.URL_BASE}/viviendas`, vivienda);
  }

  updateVivienda(id: number, vivienda: Partial<Vivienda>): Observable<ViviendaResponse> {
    return this.http.put<ViviendaResponse>(`${this.URL_BASE}/viviendas/${id}`, vivienda);
  }

  deleteVivienda(id: number): Observable<any> {
    return this.http.delete(`${this.URL_BASE}/viviendas/${id}`);
  }
}
