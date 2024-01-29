<?php
class TrabajadorController
{
    function TRABAJADOR_LISTAR()
    {
        $query = Flight::db()->prepare("CALL PROC_TRABAJADOR_LISTAR()");
        $query->execute();
        $result = $query->fetchAll(PDO::FETCH_ASSOC);

        //imprimir en JSON
        Flight::json($result);
    }

    
    function TRABAJADOR_CU()
    {
        // Respuesta
        $response = null;

        try {
            $data = Flight::request()->data;
            $query = Flight::db()->prepare("CALL PROC_TRABAJADOR_CU(:ID_TRABAJADOR, :DOCUMENTO, :NOMBRES, :APMATERNO, :APPATERNO, :CARGO)");
            $query->execute([
                "ID_TRABAJADOR" => $data->ID_TRABAJADOR,
                "DOCUMENTO" => $data->DOCUMENTO,
                "NOMBRES" => $data->NOMBRES,
                "APMATERNO" => $data->APMATERNO,
                "APPATERNO" => $data->APPATERNO,
                "CARGO" => $data->CARGO
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

    function TRABAJADOR_DELETE()
    {
        // Respuesta
        $response = null;

        try {
            $data = Flight::request()->data;
            $query = Flight::db()->prepare("CALL PROC_TRABAJADOR_DELETE(:ID_TRABAJADOR)");
            $query->execute([
                "ID_TRABAJADOR" => $data->ID_TRABAJADOR
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