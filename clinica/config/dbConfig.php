<?php
// Configuracion de acceso a DB
$host = 'localhost:3307';
$db = 'clinica';
$user = 'root';
$password = '';

$GLOBALS["db"] = array("mysql:host=$host;dbname=$db;charset=utf8", $user, $password);