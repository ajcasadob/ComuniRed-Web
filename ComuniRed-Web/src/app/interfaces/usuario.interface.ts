export interface Usuario {
    id: number;
    name: string;
    email: string;
    role:string
    email_verified_at: null | string;
    created_at: string;
    updated_at: string;
}

export interface LoginResponse {
    token: string;
    user: Usuario;
}