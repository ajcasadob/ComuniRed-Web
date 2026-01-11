import { Vivienda } from './vivienda.interface';

export interface UsuarioReserva {
    id: number;
    name: string;
    email: string;
    vivienda_id: number | null;
    vivienda?: Vivienda;
    created_at: string;
    updated_at: string;
}

export interface Reserva {
    id: number;
    nombre_espacio: string;
    usuario_id: number;
    fecha_reserva: string;
    hora_inicio: string;
    hora_fin: string;
    estado: string;
    created_at: string;
    updated_at: string;
    usuario?: UsuarioReserva;
}

export interface ReservaResponse {
    id: number;
    nombre_espacio: string;
    usuario_id: number;
    fecha_reserva: string;
    hora_inicio: string;
    hora_fin: string;
    estado: string;
    created_at: string;
    updated_at: string;
    usuario?: UsuarioReserva;
}
