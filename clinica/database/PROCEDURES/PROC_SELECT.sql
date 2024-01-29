-- = SELECT TRABAJADOR
DELIMITER //

CREATE PROCEDURE PROC_SELECT_TRABAJADOR()
BEGIN
    SELECT * FROM TRABAJADOR WHERE ESTADO = '1';
END //
DELIMITER ;


-- = SELECT PRIVILEGIO
DELIMITER //
CREATE PROCEDURE PROC_SELECT_PRIVILEGIO()
BEGIN
    SELECT * FROM privilegio WHERE ESTADO = '1';
END //

DELIMITER ;


-- = SELECT CLIENTE
DELIMITER //
CREATE PROCEDURE PROC_SELECT_CLIENTE()
BEGIN
    SELECT * FROM CLIENTE WHERE ESTADO = '1';
END //

DELIMITER ;


-- = SELECT PROCEDIMIENTO
DELIMITER //
CREATE PROCEDURE PROC_SELECT_PROCEDIMIENTO()
BEGIN
    SELECT * FROM PROCEDIMIENTO WHERE ESTADO = '1';
END //

DELIMITER ;


-- = SELECT TIPO DE PAGO
DELIMITER //
CREATE PROCEDURE PROC_SELECT_TIPO_PAGO()
BEGIN
    SELECT * FROM TIPO_PAGO WHERE ESTADO = '1';
END //

DELIMITER ;