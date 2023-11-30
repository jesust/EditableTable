class InlineCellModifier extends EditableTable {
    // ... (resto del código)

    /**
     * Establece el valor de una celda específica.
     * @param {number} rowIndex - Índice de la fila.
     * @param {number} columnIndex - Índice de la columna.
     * @param {any} newValue - Nuevo valor para la celda.
     */
    setCellValueAt(rowIndex, columnIndex, newValue) {
        const row = this.table.rows[rowIndex - 1];
        if (row) {
            const cell = row.cells[columnIndex - 1];
            if (cell) {
                cell.innerText = newValue;
            }
        }
    }
}

