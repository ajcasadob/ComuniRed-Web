export class ComunicacionDTO {
    titulo: string;
    contenido: string;
    tipo: string;
    autor_id: number;
    fecha_publicacion: string;
    activa: boolean;

    constructor(
        titulo: string,
        contenido: string,
        tipo: string,
        autor_id: number,
        fecha_publicacion: string,
        activa: boolean
    ) {
        this.titulo = titulo;
        this.contenido = contenido;
        this.tipo = tipo;
        this.autor_id = autor_id;
        this.fecha_publicacion = fecha_publicacion;
        this.activa = activa;
    }
}
