import { Vivienda } from './vivienda.interface';

export interface Pago {
    id: number;
    vivienda_id: number;
    concepto: string;
    periodo: string;
    importe: number;
    estado: string;
    fecha_vencimiento: string;
    fecha_pago: string | null;
    created_at: string;
    updated_at: string;
    vivienda?: Vivienda;
}

export interface PagoResponse {
    id: number;
    vivienda_id: number;
    concepto: string;
    periodo: string;
    importe: number;
    estado: string;
    fecha_vencimiento: string;
    fecha_pago: string | null;
    created_at: string;
    updated_at: string;
    vivienda?: Vivienda;
}
