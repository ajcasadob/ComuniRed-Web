import { Vivienda } from "./vivienda.interface";

export interface Usuario {
    id: number;
    name: string;
    email: string;
    role: string;
    vivienda_id?: number | null; 
    vivienda?: Vivienda;
    email_verified_at: null | string;
    created_at: string;
    updated_at: string;
}

export interface LoginResponse {
    token: string;
    user: Usuario;
}
