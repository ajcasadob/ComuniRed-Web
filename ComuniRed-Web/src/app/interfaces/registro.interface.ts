export interface User {
    id: number;
    name: string;
    email: string;
    vivienda_id?: number | null; // AGREGAR
    created_at: string;
    updated_at: string;
}

export interface RegistroResponse {
    token: string;
    user: User;
}
