<?php

class ProcedimientoController
{
    function PROCEDIMIENTO_LISTAR()
    {
        $query = Flight::db()->prepare("CALL PROC_PROCEDIMIENTO_LISTAR()");
        $query->execute();
        $result = $query->fetchAll(PDO::FETCH_ASSOC);

        //imprimir en JSON
        Flight::json($result);
    }

    
    function PROCEDIMIENTO_CU()
    {
        // Respuesta
        $response = null;

        try {
            $data = Flight::request()->data;
            $query = Flight::db()->prepare("CALL PROC_PROCEDIMIENTO_CU(:ID_PROCEDIMIENTO, :NOM_PROCEDIMIENTO, :PRECIO)");
            $query->execute([
                "ID_PROCEDIMIENTO" => $data->ID_PROCEDIMIENTO,
                "NOM_PROCEDIMIENTO" => $data->NOM_PROCEDIMIENTO,
                "PRECIO" => $data->PRECIO
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

    function PROCEDIMIENTO_DELETE()
    {
        // Respuesta
        $response = null;

        try {
            $data = Flight::request()->data;
            $query = Flight::db()->prepare("CALL PROC_PROCEDIMIENTO_DELETE(:ID_PROCEDIMIENTO)");
            $query->execute([
                "ID_PROCEDIMIENTO" => $data->ID_PROCEDIMIENTO
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