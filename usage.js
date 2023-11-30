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

// Ejemplo de uso:
const editableTable1 = new EditableTable("#table1", {
    1: { type: "number" },
    4: { type: "number" },
    5: { type: "number" },
}, (columnIndex, modifiedValue, rowValues, originalValue) => {
    console.log(`Modified value in column ${columnIndex}: ${modifiedValue}`);
    console.log("Original value:", originalValue);
    console.log("All values in the row:", rowValues);

    //editableTable1.restoreOriginalValue();
});

const editableTable2 = new EditableTable("#table2", {
    2: { type: "text" },
    3: { type: "number" },
}, (columnIndex, modifiedValue, rowValues, originalValue) => {
    console.log(`Modified value in column ${columnIndex}: ${modifiedValue}`);
    console.log("Original value:", originalValue);
    console.log("All values in the row:", rowValues);
});