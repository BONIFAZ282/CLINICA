-- = SUMA TOTAL DE DINERO DE LAS CONSULTAS
DELIMITER $$

CREATE PROCEDURE PROC_INGRESOS_TOTAL()
BEGIN
    -- Declarar la variable para almacenar la suma total
    DECLARE TOTAL_PROCEDIMIENTO DECIMAL(10, 2);

    -- Inicializar la variable a cero
    SET TOTAL_PROCEDIMIENTO = 0;

    -- Obtener la suma total del campo "TOTAL" de la tabla "procedimiento"
    SELECT SUM(P.TOTAL) INTO TOTAL_PROCEDIMIENTO
    FROM CONSULTA AS C
    INNER JOIN PROCEDIMIENTO AS P ON C.ID_PROCEDIMIENTO = P.ID_PROCEDIMIENTO;

    -- Mostrar la suma total
    SELECT TOTAL_PROCEDIMIENTO AS 'SUMA_TOTAL';
END $$

DELIMITER ;


-- = SUMA TOTAL DE DINERO DE LAS CONSULTAS POR TRABAJADOR
DELIMITER $$

CREATE PROCEDURE PROC_INGRESOS_TOTAL_TRABAJADOR(IN trabajador_id_param INT)
BEGIN
    -- Declarar las variables para almacenar el ID_TRABAJADOR y la suma total
    DECLARE id_trabajador_result INT;
    DECLARE nom_trabajador_result VARCHAR(100);
    DECLARE total_procedimiento DECIMAL(10, 2);

    -- Obtener el ID_TRABAJADOR y NOM_TRABAJADOR del trabajador proporcionado
    SELECT ID_TRABAJADOR, CONCAT(NOMBRES, ' ', APPATERNO, ' ', APMATERNO)
    INTO id_trabajador_result, nom_trabajador_result
    FROM trabajador
    WHERE ID_TRABAJADOR = trabajador_id_param;

    -- Obtener la suma total del campo "TOTAL" para el ID_TRABAJADOR proporcionado
    SELECT SUM(P.TOTAL) INTO total_procedimiento
    FROM consulta AS C
    INNER JOIN procedimiento AS P ON C.ID_PROCEDIMIENTO = P.ID_PROCEDIMIENTO
    WHERE C.ID_TRABAJADOR = trabajador_id_param;

    -- Mostrar los resultados
    SELECT id_trabajador_result AS 'ID_TRABAJADOR',
           nom_trabajador_result AS 'TRABAJADOR',
           total_procedimiento AS 'SUMA';
END $$

DELIMITER ;