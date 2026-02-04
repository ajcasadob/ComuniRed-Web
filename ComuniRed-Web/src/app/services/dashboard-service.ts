import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estadisticas } from '../interfaces/dashboard.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  URL_BASE = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getEstadisticas(): Observable<Estadisticas> {
    return this.http.get<Estadisticas>(`${this.URL_BASE}/dashboard/estadisticas`);
  }
  
}
