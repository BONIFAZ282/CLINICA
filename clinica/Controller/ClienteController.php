<?php

class ClienteController
{
    function CLIENTE_LISTAR()
    {
        $query = Flight::db()->prepare("CALL PROC_CLIENTE_LISTAR()");
        $query->execute();
        $result = $query->fetchAll(PDO::FETCH_ASSOC);

        //imprimir en JSON
        Flight::json($result);
    }

    
    function CLIENTE_CU()
    {
        // Respuesta
        $response = null;

        try {
            $data = Flight::request()->data;
            $query = Flight::db()->prepare("CALL PROC_CLIENTE_CU(:ID_CLIENTE, :DOCUMENTO, :NOMBRES, :APMATERNO, :APPATERNO, :CELULAR)");
            $query->execute([
                "ID_CLIENTE" => $data->ID_CLIENTE,
                "DOCUMENTO" => $data->DOCUMENTO,
                "NOMBRES" => $data->NOMBRES,
                "APMATERNO" => $data->APMATERNO,
                "APPATERNO" => $data->APPATERNO,
                "CELULAR" => $data->CELULAR
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

    function CLIENTE_DELETE()
    {
        // Respuesta
        $response = null;

        try {
            $data = Flight::request()->data;
            $query = Flight::db()->prepare("CALL PROC_CLIENTE_DELETE(:ID_CLIENTE)");
            $query->execute([
                "ID_CLIENTE" => $data->ID_CLIENTE
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