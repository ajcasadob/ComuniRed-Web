export interface Incidencia {
    id: number;
    titulo: string;
    descripcion: string;
    ubicacion: string;
    categoria: string;
    prioridad: string;
    estado: string;
    usuario_id: number;
    vivienda_id: number | null;
    fecha_resolucion: string | null;
    foto: string | null;
    created_at: string;
    updated_at: string;
}

export interface IncidenciaResponse {
    id: number;
    titulo: string;
    descripcion: string;
    ubicacion: string;
    categoria: string;
    prioridad: string;
    estado: string;
    usuario_id: number;
    vivienda_id: number | null;
    fecha_resolucion: string | null;
    foto: string | null;
    created_at: string;
    updated_at: string;
}
