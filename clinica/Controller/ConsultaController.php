<?php

class ConsultaController
{
    function CONSULTA_LISTAR()
    {
        $query = Flight::db()->prepare("CALL PROC_CONSULTA_LIST()");
        $query->execute();
        $result = $query->fetchAll(PDO::FETCH_ASSOC);

        //imprimir en JSON
        Flight::json($result);
    }

    
    function CONSULTA_CU()
    {
        // Respuesta
        $response = null;

        try {
            $data = Flight::request()->data;
            $query = Flight::db()->prepare("CALL PROC_CONSULTA_CU(:ID_CONSULTA, :OBSERVACION, :FECHA, :ID_TRABAJADOR, :ID_CLIENTE, :ID_PROCEDIMIENTO, :ID_TIPO_PAGO)");
            $query->execute([
                "ID_CONSULTA" => $data->ID_CONSULTA,
                "OBSERVACION" => $data->OBSERVACION,
                "FECHA" => $data->FECHA,
                "ID_TRABAJADOR" => $data->ID_TRABAJADOR,
                "ID_CLIENTE" => $data->ID_CLIENTE,
                "ID_PROCEDIMIENTO" => $data->ID_PROCEDIMIENTO,
                "ID_TIPO_PAGO" => $data->ID_TIPO_PAGO
            ]);
            $result = $query->fetchAll(PDO::FETCH_ASSOC);

            // Armamos nuestra respuesta
            $response = array(
                "icon" => $result[0]["ICON"],
                "title" => "MENSAJE DEL SISTEMA",
                "text" => $result[0]["MESSAGE_TEXT"],
                "statusCode" => $result[0]["STATUS_CODE"]
            );
        } catch (Exception $err) {
            // Enviamos informe del error
            $response = array(
                "icon" => "error",
                "title" => "MENSAJE DEL SISTEMA",
                "text" => $err->getMessage(),
                "statusCode" => "500",
                "data" => null
            );
        }

        // Imprimimos en JSON
        Flight::json($response, intval($response["statusCode"]));
    }


    
  function ELIMINAR_CONSULTA()
  {
    // Respuesta
    $response = null;

    try {
      $data = Flight::request()->data;
      $query = Flight::db()->prepare("CALL PROC_CONSULTA_DELETE(:ID_CONSULTA)");
      $query->execute([
        "ID_CONSULTA" => $data->ID_CONSULTA
      ]);
      $result = $query->fetchAll(PDO::FETCH_ASSOC);

      // Armamos nuestra respuesta
      $response = array(
        "icon" => $result[0]["ICON"],
        "title" => "MENSAJE DEL SISTEMA",
        "text" => $result[0]["MESSAGE_TEXT"],
        "statusCode" => $result[0]["STATUS_CODE"]
      );
    } catch (Exception $err) {
      // Enviamos informe del error
      $response = array(
        "icon" => "error",
        "title" => "MENSAJE DEL SISTEMA",
        "text" => $err->getMessage(),
        "statusCode" => "500",
        "data" => null
      );
    }

    // Imprimimos en JSON
    Flight::json($response, intval($response["statusCode"]));
  }
}