import { Vivienda } from "./vivienda.interface";

export interface Usuario {
    id: number;
    name: string;
    email: string;
    role: string;
    vivienda_id?: number | null; // AGREGAR
    vivienda?: Vivienda; // AGREGAR (importar de vivienda.interface.ts)
    email_verified_at: null | string;
    created_at: string;
    updated_at: string;
}

export interface LoginResponse {
    token: string;
    user: Usuario;
}
