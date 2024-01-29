<?php
// Configuracion
require './config/cors.php';

// JWT
require './vendor/firebase/php-jwt/src/JWT.php';
require './config/JWTConfig.php';

// Bliblioteca Flight
require 'flight/Flight.php';

//MODAL
require './Model/Token.php';
require './Model/Usuario.php';

// Llamado a los ficheros correpondientes de cada controlador
require './Controller/ConsultaController.php';
require './Controller/PrivilegioController.php';
require './Controller/ClienteController.php';
require './Controller/TrabajadorController.php';
require './Controller/ProcedimientoController.php';
require './Controller/TipoPagoController.php';
require './Controller/IngresosController.php';
require './Controller/UsuarioController.php';

require './Controller/SelectController.php';

// |||||||||||||| DATABASE ||||||||||||||||||||||||
require './config/dbConfig.php';

// Registro a Flight con las configuraciones de DB
Flight::register('db', 'PDO', $GLOBALS["db"]);

// Ruta principal devuelvo mensaje por GET para probar el correcto funcionanmiento de API
Flight::route('GET /', function () {
    $data = array('info' => 'API SISCAP CSJICA');
    Flight::json($data);
});

// ||||||||||||||||||| RUTAS |||||||||||||||||||||||||||

// SELECT
$selectController = new SelectController();
Flight::route('GET /select/privilegio', array($selectController, 'SELECT_PRIVILEGIO'));
Flight::route('GET /select/trabajador', array($selectController, 'SELECT_TRABAJADOR'));
Flight::route('GET /select/cliente', array($selectController, 'SELECT_CLIENTE'));
Flight::route('GET /select/procedimiento', array($selectController, 'SELECT_PROCEDIMIENTO'));
Flight::route('GET /select/tpago', array($selectController, 'SELECT_TIPO_PAGO'));

// USAURIOS
$usuarioController = new UsuarioController();
Flight::route('POST /auth', array($usuarioController, "LOGIN_USUARIO"));
Flight::route('GET /usuario/list', array($usuarioController, "LISTAR_USUARIOS"));
Flight::route('POST /usuario/create', array($usuarioController, "CREAR_USUARIO"));
Flight::route('POST /usuario/delete', array($usuarioController, "ELIMINAR_USUARIO"));


// INGRESOS
$ingresosController = new IngresosController();
Flight::route('GET /ingresos/list', array($ingresosController, "INGRESOS_LISTAR"));
Flight::route('GET /Tingresos/list', array($ingresosController, "INGRESOS_LISTAR_TRABAJADOR"));


// CONSULTA
$consultaController = new ConsultaController();
Flight::route('GET /consulta/list', array($consultaController, "CONSULTA_LISTAR"));
Flight::route('POST /consulta/create', array($consultaController, "CONSULTA_CU"));
Flight::route('POST /consulta/delete', array($consultaController, "ELIMINAR_CONSULTA"));


// PRIVILEGIO
$privilegioController = new PrivilegioController();
Flight::route('GET /privilegio/list', array($privilegioController, "PRIVILEGIO_LISTAR"));
Flight::route('POST /privilegio/create', array($privilegioController, "PRIVILEGIO_CU"));
Flight::route('POST /privilegio/delete', array($privilegioController, "PRIVILEGIO_DELETE"));

// CLIENTE
$clienteController = new ClienteController();
Flight::route('GET /cliente/list', array($clienteController, "CLIENTE_LISTAR"));
Flight::route('POST /cliente/create', array($clienteController, "CLIENTE_CU"));
Flight::route('POST /cliente/delete', array($clienteController, "CLIENTE_DELETE"));

// TRABAJADOR
$trabajadorController = new TrabajadorController();
Flight::route('GET /trabajador/list', array($trabajadorController, "TRABAJADOR_LISTAR"));
Flight::route('POST /trabajador/create', array($trabajadorController, "TRABAJADOR_CU"));
Flight::route('POST /trabajador/delete', array($trabajadorController, "TRABAJADOR_DELETE"));


// PROCEDIMIENTO
$procedimientoController = new ProcedimientoController();
Flight::route('GET /procedimiento/list', array($procedimientoController, "PROCEDIMIENTO_LISTAR"));
Flight::route('POST /procedimiento/create', array($procedimientoController, "PROCEDIMIENTO_CU"));
Flight::route('POST /procedimiento/delete', array($procedimientoController, "PROCEDIMIENTO_DELETE"));


// TIPO DE PAGO
$tipoPagoController = new TipoPagoController();
Flight::route('GET /tpago/list', array($tipoPagoController, "TIPO_PAGO_LISTAR"));
Flight::route('POST /tpago/create', array($tipoPagoController, "TIPO_PAGO_CU"));
Flight::route('POST /tpago/delete', array($tipoPagoController, "TIPO_PAGO_DELETE"));




// Iniciar Flight
Flight::start();
