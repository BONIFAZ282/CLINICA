<?php

class SelectController
{
    function SELECT_PRIVILEGIO()
  {
    $query = Flight::db()->prepare("CALL PROC_SELECT_PRIVILEGIO()");
    $query->execute();
    $result = $query->fetchAll(PDO::FETCH_ASSOC);

    // Imprimimos en JSON
    Flight::json($result);
  }

  function SELECT_TRABAJADOR()
  {
    $query = Flight::db()->prepare("CALL PROC_SELECT_TRABAJADOR()");
    $query->execute();
    $result = $query->fetchAll(PDO::FETCH_ASSOC);

    // Imprimimos en JSON
    Flight::json($result);
  }

  function SELECT_CLIENTE()
  {
    $query = Flight::db()->prepare("CALL PROC_SELECT_CLIENTE()");
    $query->execute();
    $result = $query->fetchAll(PDO::FETCH_ASSOC);

    // Imprimimos en JSON
    Flight::json($result);
  }

  function SELECT_PROCEDIMIENTO()
  {
    $query = Flight::db()->prepare("CALL PROC_SELECT_PROCEDIMIENTO()");
    $query->execute();
    $result = $query->fetchAll(PDO::FETCH_ASSOC);

    // Imprimimos en JSON
    Flight::json($result);
  }

  function SELECT_TIPO_PAGO()
  {
    $query = Flight::db()->prepare("CALL PROC_SELECT_TIPO_PAGO()");
    $query->execute();
    $result = $query->fetchAll(PDO::FETCH_ASSOC);

    // Imprimimos en JSON
    Flight::json($result);
  }

}