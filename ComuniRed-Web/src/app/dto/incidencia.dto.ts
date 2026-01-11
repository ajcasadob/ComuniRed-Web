export class IncidenciaDTO {
    titulo: string;
    descripcion: string;
    ubicacion: string;
    categoria: string;
    estado: string;
    usuario_id: number;
    vivienda_id?: number | null;
    fecha_resolucion?: string | null;
    imagen_url?: string | null;

    constructor(
        titulo: string,
        descripcion: string,
        ubicacion: string,
        categoria: string,
        estado: string,
        usuario_id: number,
        vivienda_id?: number | null,
        fecha_resolucion?: string | null,
        imagen_url?: string | null
    ) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.ubicacion = ubicacion;
        this.categoria = categoria;
        this.estado = estado;
        this.usuario_id = usuario_id;
        this.vivienda_id = vivienda_id;
        this.fecha_resolucion = fecha_resolucion;
        this.imagen_url = imagen_url;
    }
}
