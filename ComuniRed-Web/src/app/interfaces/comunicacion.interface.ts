export interface Comunicacion {
    id: number;
    titulo: string;
    contenido: string;
    tipo: string;
    autor_id: number;
    fecha_publicacion: string;
    activa: boolean;
    created_at: string;
    updated_at: string;
}

export interface ComunicacionResponse {
    id: number;
    titulo: string;
    contenido: string;
    tipo: string;
    autor_id: number;
    fecha_publicacion: string;
    activa: boolean;
    created_at: string;
    updated_at: string;
}
