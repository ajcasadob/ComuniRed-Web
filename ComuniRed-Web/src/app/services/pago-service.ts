import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pago, PagoResponse } from '../interfaces/pago.interface';
import { PagoDTO } from '../dto/pago.dto';

@Injectable({
  providedIn: 'root',
})
export class PagoService {
  
  URL_BASE = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getAllPagos(): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${this.URL_BASE}/pagos`);
  }

  getPagoById(id: number): Observable<Pago> {
    return this.http.get<Pago>(`${this.URL_BASE}/pagos/${id}`);
  }

  createPago(pago: PagoDTO): Observable<PagoResponse> {
    return this.http.post<PagoResponse>(`${this.URL_BASE}/pagos`, pago);
  }

  updatePago(id: number, pago: PagoDTO): Observable<PagoResponse> {
    return this.http.put<PagoResponse>(`${this.URL_BASE}/pagos/${id}`, pago);
  }

  deletePago(id: number): Observable<any> {
    return this.http.delete(`${this.URL_BASE}/pagos/${id}`);
  }
}
