export interface Vivienda {
    id: number;
    numero_vivienda: string;
    bloque: string | null;
    piso: string | null;
    puerta: string | null;
    metros_cuadrados: number | null;
    tipo: 'piso' | 'local' | 'garaje';
    created_at: string;
    updated_at: string;
}

export interface ViviendaResponse {
    id: number;
    numero_vivienda: string;
    bloque: string | null;
    piso: string | null;
    puerta: string | null;
    metros_cuadrados: number | null;
    tipo: 'piso' | 'local' | 'garaje';
    created_at: string;
    updated_at: string;
}
