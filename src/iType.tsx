interface iResponse {
  icon: string;
  statusCode: string;
  title: string;
  text: string;
  data: any[];
}


interface iLUsuarios {
  ID_USUARIO: string;
  ID_PERSONA: string;
  ID_PRIVILEGIO: string;
  ID_SEGURIDAD: string;
  NOMBRE_PRIVILEGIO: string;
  CONTRASENIA: string;
  NOMBRES: string;
  APPATERNO: string;
  APMATERNO: string;
  DOCUMENTO: string;
  CODIGO: string;
  ESTADO: string;
}

interface iLPersona{
  ID_PERSONA: string;
  NOMBRES: string;
  APPATERNO: string;
  APMATERNO: string;
  DOCUMENTO: string;
  CARGO: string;
  ESTADO: string;
}

interface iLCliente{
  ID_CLIENTE: string;
  DOCUMENTO: string;
  NOMBRES: string;
  APMATERNO: string;
  APPATERNO: string;
  CELULAR: string;
  ESTADO: string;
}


interface iLTrabajador {
  ID_TRABAJADOR: string;
  NOMBRES: string;
  APPATERNO: string;
  APMATERNO: string;
  DOCUMENTO: string;
  CARGO: string;
  ESTADO: string;
}

interface iLPrivilegio {
  ID_PRIVILEGIO: string;
  NOM_PRIVILEGIO: string;
  ESTADO: string;
}

interface iLCategoria {
  ID_CATEGORIA: string;
  NOM_CATEGORIA: string;
  ESTADO: string;
}


interface iLTipoVehiculo {
  ID_TIPO_VEHICULO: string;
  NOM_TIPO_VEHICULO: string;
  ESTADO: string;
}

interface iLSeguridad {
  ID_SEGURIDAD: string;
  ID_PERSONA: string;
  NOMBRES: string;
  APPATERNO: string;
  APMATERNO: string;
  DOCUMENTO: string;
  CODIGO: string;
  ESTADO: string;
}

interface iLProcedimiento{
  ID_PROCEDIMIENTO: string;
  NOM_PROCEDIMIENTO: string;
  PRECIO: string;
  ESTADO: string;
}

interface iLTipoPago{
  ID_TIPO_PAGO: string;
  DESCRIPCION: string;
  ESTADO: string;
}

interface iLConsulta{
  ID_CONSULTA: string;
  OBSERVACION: string;
  FECHA: string;
  ID_TRABAJADOR : string;
  DOCTORA: string;
  ID_CLIENTE: string;
  NOMBRES: string;
  NOMBRE_CLIENTE: string;
  APPATERNO: string;
  APMATERNO: string;
  ID_PROCEDIMIENTO : string;
  NOM_PROCEDIMIENTO: string;
  PRECIO: string;
  ID_TIPO_PAGO : string;
  TIPO_PAGO: string;
  FECHA_CONSULTA: string;
  ESTADO: string;
}


interface iLAnio {
  ANIO: string;
}

export type {
  iLCliente,
  iLProcedimiento,
  iLPrivilegio,
  iLCategoria,
  iLTipoVehiculo,
  iLSeguridad,
  iLUsuarios,
  iLTrabajador,
  iLPersona,
  iLTipoPago,
  iLConsulta,
  iResponse,
  iLAnio,
};
