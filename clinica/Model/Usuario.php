<?php
class Usuario
{
  public function LOGIN($data)
  {
    $query = Flight::db()->prepare(

      "SELECT TRABAJADOR.DOCUMENTO, TRABAJADOR.NOMBRES, USUARIO.CONTRASENIA, privilegio.DESCRIPCION AS 'NOMBRE_PRIVILEGIO'
      FROM TRABAJADOR
      JOIN USUARIO ON TRABAJADOR.ID_TRABAJADOR = USUARIO.ID_TRABAJADOR
      JOIN privilegio ON privilegio.ID_PRIVILEGIO = usuario.ID_PRIVILEGIO
      WHERE
      DOCUMENTO = :DOCUMENTO AND
      CONTRASENIA = :CONTRASENIA");

    $query->execute([
      "DOCUMENTO" => $data->DOCUMENTO,
      "CONTRASENIA" => $data->CONTRASENIA
    ]);

    return $query->fetchAll(PDO::FETCH_ASSOC);
  }
}