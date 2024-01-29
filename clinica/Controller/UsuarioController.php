<?php


class UsuarioController
{
  public function LISTAR_USUARIOS()
  {
    $query = Flight::db()->prepare("CALL PROC_USUARIO_LIST");
    $query->execute();
    $result = $query->fetchAll(PDO::FETCH_ASSOC);

    // Imprimimos en JSON
    Flight::json($result);
  }

  public function LOGIN_USUARIO()
  {
    $data = Flight::request()->data;
    $usuario = new Usuario();

    try {
      // Obtenemos usuario
      $result = $usuario->LOGIN($data);

      if (count($result) > 0) {
        $tk = new Token();
        $jwt = $tk->generarToken(sha1($result[0]["NOMBRES"]), 1);
      }

      Flight::json(
        count($result) > 0 ?
        array(
          array_merge(
            $result[0],
            array(
              "token" => $jwt
            )
          )
        ) : array()
      );
    } catch (Exception $e) {
      Flight::json(array("message" => $e->getMessage()), 500);
    }
  }
  public function CREAR_USUARIO()
  {
    // Respuesta
    $response = null;

    try {
      $data = Flight::request()->data;

      // Armado de consulta
      $query = Flight::db()->prepare("CALL PROC_USUARIO_CU(:ID_USUARIO, :ID_TRABAJADOR, :ID_PRIVILEGIO, :CONTRASENIA)");
      // Ejecutamos la consulta
      $query->execute([
        "ID_USUARIO" => $data->ID_USUARIO,
        "ID_TRABAJADOR" => $data->ID_TRABAJADOR,
        "ID_PRIVILEGIO" => $data->ID_PRIVILEGIO,
        "CONTRASENIA" => $data->CONTRASENIA
      ]);

      // Lo asociamos
      $result = $query->fetchAll(PDO::FETCH_ASSOC);

      // Armamos nuestra respuesta
      $response = array(
        "icon" => $result[0]["ICON"],
        "title" => "MENSAJE DEL SISTEMA",
        "text" => $result[0]["MESSAGE_TEXT"],
        "statusCode" => $result[0]["STATUS_CODE"]
      );

      // En caso haya errores
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


  function ELIMINAR_USUARIO()
  {
    // Respuesta
    $response = null;

    try {
      $data = Flight::request()->data;
      $query = Flight::db()->prepare("CALL PROC_USUARIO_DELETE(:ID_USUARIO)");
      $query->execute([
        "ID_USUARIO" => $data->ID_USUARIO
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