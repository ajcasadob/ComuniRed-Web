export class PagoDTO {
    vivienda_id: number;
    concepto: string;
    periodo: string;
    importe: number;
    estado: string;
    fecha_vencimiento: string;
    fecha_pago: string | null;

    constructor(
        vivienda_id: number,
        concepto: string,
        periodo: string,
        importe: number,
        estado: string,
        fecha_vencimiento: string,
        fecha_pago: string | null
    ) {
        this.vivienda_id = vivienda_id;
        this.concepto = concepto;
        this.periodo = periodo;
        this.importe = importe;
        this.estado = estado;
        this.fecha_vencimiento = fecha_vencimiento;
        this.fecha_pago = fecha_pago;
    }
}
