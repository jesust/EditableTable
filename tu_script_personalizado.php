<?php
// tu_script_personalizado.php

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener datos enviados por POST
    $columnIndex = $_POST['columnIndex'];
    $modifiedValue = $_POST['modifiedValue'];
    $originalValue = $_POST['originalValue'];
    $rowValues = json_decode($_POST['rowValues'], true);

    // Aquí puedes realizar las operaciones necesarias con los datos recibidos
    // (por ejemplo, actualizar una base de datos)

    // Preparar datos para enviar de vuelta a JavaScript
    $response = [
        'columnIndex' => $columnIndex,
        'modifiedValue' => $modifiedValue,
        'originalValue' => $originalValue,
        'rowValues' => $rowValues,
        'message' => 'Datos recibidos correctamente',
    ];

    // Imprimir los datos en formato JSON
    echo json_encode($response);
} else {
    // Si la solicitud no es de tipo POST, devolver un mensaje de error
    $response = ['error' => 'Método de solicitud no permitido'];
    echo json_encode($response);
}

