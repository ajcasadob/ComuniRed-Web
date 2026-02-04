export interface Estadisticas {
  reservas_activas: number;
  incidencias_pendientes: number;
  incidencias_urgentes: number;
  tasa_cobro: number;
  vecinos_registrados: number;
  ocupacion_instalaciones: OcupacionInstalacion[];
}

export interface OcupacionInstalacion {
  nombre: string;
  clave: string;
  porcentaje: number;
}
