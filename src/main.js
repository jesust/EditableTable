// main.js

import EditableTable from "./modules/EditableTable.js";  


/* 


const inlineCellModifier1 = new InlineCellModifier("#table1", {
    1: { type: "number" },
    4: { type: "number" },
    5: { type: "number" },
}, (columnIndex, modifiedValue, originalValue, rowValues) => {
    console.log(`Modified value in column ${columnIndex}: ${modifiedValue}`);
    console.log("Original value:", originalValue);
    console.log("All values in the row:", rowValues);

    // Restaurar el valor original si es necesario
    //inlineCellModifier1.restoreOriginalValue();
});
 */


/**
 * Función customAjaxCallback
 * 
 * Esta función maneja la lógica de AJAX al realizar una solicitud fetch a un servidor
 * usando el método POST. Toma varios parámetros relacionados con la modificación de una celda.
 * 
 * @param {number} columnIndex - El índice de la columna modificada.
 * @param {any} modifiedValue - El valor modificado en la celda.
 * @param {any} originalValue - El valor original en la celda antes de la modificación.
 * @param {Array} rowValues - Un array con los valores de toda la fila.
 */
const customAjaxCallback = (columnIndex, modifiedValue, originalValue, rowValues) => {
    // Construye un objeto con los parámetros y sus valores
    const parameters = {
        columnIndex,
        modifiedValue,
        originalValue,
        rowValues: JSON.stringify(rowValues),
    };

    // Realiza una solicitud fetch a "tu_script_personalizado.php" usando el método POST
    fetch("tu_script_personalizado.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        // Convierte el objeto de parámetros a una cadena de consulta
        body: new URLSearchParams(parameters).toString(),
    })
        // Maneja la respuesta en formato JSON
        .then(response => response.json())
        .then(data => {
            // Aqui el equivale al success
            console.log(data);
        })
        // Maneja los errores
        .catch(error => {
            // Aqui el equivalente de error
            console.error("Error:", error);
        });
};


// Instancia de EditableTable con configuración de tipos de datos por columna y función de callback
const editableTable1 = new EditableTable("#table1", {
    1: { type: "number" },
    4: { type: "number" },
    5: { type: "number" },
}, (columnIndex, modifiedValue, originalValue, rowValues) => {
    // Imprime información sobre la columna modificada, el valor modificado, el valor original y los valores de la fila
    console.log(`Modified value in column ${columnIndex}: ${modifiedValue}`);
    console.log("Original value:", originalValue);
    console.log("All values in the row:", rowValues);

    // Llama a la función de AJAX personalizada con los valores relevantes
    editableTable1.sendDataToServer(columnIndex, modifiedValue, originalValue, rowValues, customAjaxCallback);

    // Restaura el valor original (comentado, ya que no está implementado en el código proporcionado)
    // editableTable1.restoreOriginalValue();
});


