import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva, ReservaResponse } from '../interfaces/reserva.interface';
import { ReservaDTO } from '../dto/reserva.dto';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  
  URL_BASE = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getAllReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.URL_BASE}/reservas`);
  }

  getReservaById(id: number): Observable<Reserva> {
    return this.http.get<Reserva>(`${this.URL_BASE}/reservas/${id}`);
  }

  createReserva(reserva: ReservaDTO): Observable<ReservaResponse> {
    return this.http.post<ReservaResponse>(`${this.URL_BASE}/reservas`, reserva);
  }

  updateReserva(id: number, reserva: ReservaDTO): Observable<ReservaResponse> {
    return this.http.put<ReservaResponse>(`${this.URL_BASE}/reservas/${id}`, reserva);
  }

  deleteReserva(id: number): Observable<any> {
    return this.http.delete(`${this.URL_BASE}/reservas/${id}`);
  }
}
