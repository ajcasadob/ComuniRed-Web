export class IncidenciaDTO {
    titulo: string;
    descripcion: string;
    ubicacion: string;
    categoria: string;
    prioridad: string;
    estado: string;
    usuario_id: number;
    vivienda_id?: number | null;
    fecha_resolucion?: string | null;
    foto?: File | null;

    constructor(
        titulo: string,
        descripcion: string,
        ubicacion: string,
        categoria: string,
        prioridad: string,
        estado: string,
        usuario_id: number,
        vivienda_id?: number | null,
        fecha_resolucion?: string | null,
        foto?: File | null
    ) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.ubicacion = ubicacion;
        this.categoria = categoria;
        this.prioridad = prioridad;
        this.estado = estado;
        this.usuario_id = usuario_id;
        this.vivienda_id = vivienda_id;
        this.fecha_resolucion = fecha_resolucion;
        this.foto = foto;
    }
}
