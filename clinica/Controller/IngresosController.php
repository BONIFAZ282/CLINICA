<?php

class IngresosController
{
    function INGRESOS_LISTAR()
    {
        $query = Flight::db()->prepare("CALL PROC_INGRESOS_TOTAL()");
        $query->execute();
        $result = $query->fetchAll(PDO::FETCH_ASSOC);

        //imprimir en JSON
        Flight::json($result);
    }

    function INGRESOS_LISTAR_TRABAJADOR($trabajadorId)
    {
        $data = Flight::request()->data;
        $query = Flight::db()->prepare("CALL PROC_INGRESOS_TOTAL_TRABAJADOR(:ID_TRABAJADOR)");
        $query->execute([
            "ID_TRABAJADOR" => $data->ID_TRABAJADOR
        ]);
        $result = $query->fetchAll(PDO::FETCH_ASSOC);

        // Imprimir en JSON
        Flight::json($result);
    }

}