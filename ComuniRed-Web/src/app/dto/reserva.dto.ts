export class ReservaDTO {
    nombre_espacio: string;
    usuario_id: number;
    fecha_reserva: string;
    hora_inicio: string;
    hora_fin: string;
    estado: string;

    constructor(
        nombre_espacio: string,
        usuario_id: number,
        fecha_reserva: string,
        hora_inicio: string,
        hora_fin: string,
        estado: string
    ) {
        this.nombre_espacio = nombre_espacio;
        this.usuario_id = usuario_id;
        this.fecha_reserva = fecha_reserva;
        this.hora_inicio = hora_inicio;
        this.hora_fin = hora_fin;
        this.estado = estado;
    }
}
