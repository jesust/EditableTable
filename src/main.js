import DeviceDetector from "./modules/DeviceDetector/DeviceDetector.js";
import EditableTable from "./modules/EditableTable/EditableTable.js";  
import InlineCellModifier from "./modules/EditableTable/InlineCellModifier.js";




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


/** */
const editableTable2 = new EditableTable("#table2", {
    2: { type: "text" },
    3: { type: "number" },
}, (columnIndex, modifiedValue, rowValues, originalValue) => {
    console.log(`Modified value in column ${columnIndex}: ${modifiedValue}`);
    console.log("Original value:", originalValue);
    console.log("All values in the row:", rowValues);
});
/** */


const customAjaxCallback = (columnIndex, modifiedValue, originalValue, rowValues) => {
    fetch("tu_script_personalizado.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `columnIndex=${columnIndex}&modifiedValue=${modifiedValue}&originalValue=${originalValue}&rowValues=${JSON.stringify(rowValues)}`,
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
};



// Instancia de EditableTable con función de AJAX personalizada
const editableTable1 = new EditableTable("#table1", {
    1: { type: "number" },
    4: { type: "number" },
    5: { type: "number" },
}, (columnIndex, modifiedValue, rowValues, originalValue) => {
    console.log(`Modified value in column ${columnIndex}: ${modifiedValue}`);
    console.log("Original value:", originalValue);
    console.log("All values in the row:", rowValues);

    // Llamada a la función de AJAX personalizada con originalValue y rowValues
    editableTable1.sendDataToServer(columnIndex, modifiedValue, originalValue, rowValues, customAjaxCallback);

    // editableTable1.restoreOriginalValue();
});


