class InlineCellModifier {
    /**
     * Constructor de la clase InlineCellModifier.
     * @param {string} tableSelector - Selector CSS de la tabla.
     * @param {Object} columnSettings - Configuración de las columnas editables.
     * @param {Function} onEditCallback - Función de devolución de llamada cuando se realiza una edición.
     */
    constructor(tableSelector, columnSettings, onEditCallback) {
        this.table = document.querySelector(tableSelector);
        this.columnSettings = columnSettings;
        this.onEditCallback = onEditCallback;
        this.selected = null;

        this.isMobile = this.detectMobileDevice();

        if (!this.table) {
            console.error(`Table with selector ${tableSelector} not found`);
            return;
        }

        if (!this.isMobile) {
            this.setupEventListeners();
        }
    }


    detectMobileDevice() {
        const userAgent = window.navigator.userAgent.toLowerCase();
        const mobileKeywords = ["iphone", "ipod", "android", "blackberry", "windows phone"];

        // Devuelve true si alguna de las palabras clave está presente en el User Agent
        return mobileKeywords.some(keyword => userAgent.includes(keyword));
    }

    /**
     * Configura los event listeners para las celdas editables.
     */
    setupEventListeners() {
        this.table.addEventListener("dblclick", this.handleTableDblClick.bind(this));
    }

    /**
     * Maneja el evento de doble clic en la tabla para iniciar la edición.
     * @param {Event} event - Evento de doble clic.
     */
    handleTableDblClick(event) {
        const cell = event.target.closest("td");
        if (cell && this.columnSettings[cell.cellIndex + 1]) {
            this.edit(cell);
        }
    }

    /**
     * Verifica si un valor es un número.
     * @param {any} value - Valor a verificar.
     * @returns {boolean} - true si es un número, false de lo contrario.
     */
    isNumber(value) {
        return !isNaN(value);
    }

    /**
     * Valida y analiza un valor en función de la configuración de la columna.
     * @param {string} value - Valor a validar y analizar.
     * @param {number} columnIndex - Índice de la columna.
     * @returns {any} - Valor analizado o false si la validación falla.
     */
    validateAndParse(value, columnIndex) {
        const columnSetting = this.columnSettings[columnIndex];

        if (value === null || value.trim() === "") {
            this.showError(`Column ${columnIndex} must not be empty.`);
            return false;
        }

        if (columnSetting) {
            if (columnSetting.type === "number") {
                return this.validateNumber(value, columnIndex);
            } else {
                return value;
            }
        }
        return value;
    }

    /**
     * Valida si un valor es un número y lo convierte.
     * @param {string} value - Valor a validar y convertir.
     * @param {number} columnIndex - Índice de la columna.
     * @returns {number|false} - Valor convertido o false si la validación falla.
     */
    validateNumber(value, columnIndex) {
        if (!this.isNumber(value)) {
            this.showError(`Column ${columnIndex} must be a valid number.`);
            return false;
        }
        return parseFloat(value);
    }

    /**
     * Muestra un mensaje de error.
     * @param {string} message - Mensaje de error a mostrar.
     */
    showError(message) {
        alert(message);
    }

    /**
     * Inicia la edición de una celda.
     * @param {HTMLElement} cell - Celda a editar.
     */
    edit(cell) {
        this.removeCellListeners(cell);

        cell.contentEditable = true;
        cell.focus();

        // Seleccionar completamente el contenido de la celda
        const range = document.createRange();
        range.selectNodeContents(cell);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);

        cell.classList.add("edit");
        this.selected = cell;
        this.value = cell.innerText;

        window.addEventListener("mousedown", this.close.bind(this));
        cell.addEventListener("keydown", this.handleCellKeydown.bind(this));
    }

    /**
     * Elimina los event listeners de una celda.
     * @param {HTMLElement} cell - Celda a la que se le eliminarán los listeners.
     */
    removeCellListeners(cell) {
        cell.removeEventListener("dblclick", this.handleTableDblClick.bind(this));
        cell.removeEventListener("keydown", this.handleCellKeydown.bind(this));
    }

    /**
     * Finaliza la edición de una celda.
     * @param {boolean} commit - true si se debe aplicar el cambio, false si se debe cancelar.
     */
    close(commit) {
        if (this.selected) {
            if (!commit) {
                this.selected.innerText = this.value;
            } else {
                const modifiedValue = this.selected.innerText;
                const columnIndex = this.selected.cellIndex + 1;
                const parsedValue = this.validateAndParse(modifiedValue, columnIndex);

                if (parsedValue !== false) {
                    this.selected.innerText = parsedValue;
                    this.performAction(columnIndex, parsedValue);
                } else {
                    this.selected.innerText = this.value;
                }
            }

            this.restoreCellListeners(this.selected);

            this.selected.contentEditable = false;
            window.removeEventListener("mousedown", this.close.bind(this));
            this.selected.classList.remove("edit");

            this.selected = null;
            this.value = "";
        }
    }

    /**
     * Restaura los event listeners de una celda.
     * @param {HTMLElement} cell - Celda a la que se le restaurarán los listeners.
     */
    restoreCellListeners(cell) {
        cell.addEventListener("dblclick", this.handleTableDblClick.bind(this));
        cell.addEventListener("keydown", this.handleCellKeydown.bind(this));
    }

    /**
     * Maneja el evento de pulsación de tecla en una celda.
     * @param {KeyboardEvent} evt - Evento de pulsación de tecla.
     */
    handleCellKeydown(evt) {
        if (evt.key === "Enter" || evt.key === "Escape") {
            evt.preventDefault();
            const commit = evt.key === "Enter";
            this.close(commit);
        } else if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(evt.key)) {
            evt.preventDefault();
            this.navigate(evt.key);
        }
    }

    /**
     * Navega a la celda adyacente según la dirección especificada.
     * @param {string} direction - Dirección de navegación ("ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight").
     */
    navigate(direction) {
        if (!this.selected) return;

        const cellIndex = this.selected.cellIndex;
        const rowIndex = this.selected.parentNode.rowIndex;

        let targetCell;
        switch (direction) {
            case "ArrowUp":
                targetCell = this.table.rows[rowIndex - 1]?.cells[cellIndex];
                break;
            case "ArrowDown":
                targetCell = this.table.rows[rowIndex + 1]?.cells[cellIndex];
                break;
            case "ArrowLeft":
                targetCell = this.findEditableCellInRow(rowIndex, cellIndex, -1);
                break;
            case "ArrowRight":
                targetCell = this.findEditableCellInRow(rowIndex, cellIndex, 1);
                break;
        }

        if (this.isCellEditable(targetCell)) {
            this.close(true);
            setTimeout(() => {
                this.edit(targetCell);
            }, 0);
        }
    }

    /**
     * Encuentra la siguiente celda editable en la misma fila.
     * @param {number} rowIndex - Índice de la fila.
     * @param {number} startCellIndex - Índice de la celda actual.
     * @param {number} direction - Dirección de búsqueda (-1 para izquierda, 1 para derecha).
     * @returns {HTMLElement|null} - Celda editable encontrada o null si no hay más celdas editables en la fila.
     */
    findEditableCellInRow(rowIndex, startCellIndex, direction) {
        const row = this.table.rows[rowIndex];
        const cells = Array.from(row.cells);

        let index = startCellIndex + direction;
        while (index >= 0 && index < cells.length) {
            const cell = cells[index];
            if (this.isCellEditable(cell)) {
                return cell;
            }
            index += direction;
        }

        return null;
    }

    /**
     * Verifica si una celda es editable.
     * @param {HTMLElement} cell - Celda a verificar.
     * @returns {boolean} - true si la celda es editable, false de lo contrario.
     */
    isCellEditable(cell) {
        return cell && cell.tagName === 'TD' && this.columnSettings[cell.cellIndex + 1];
    }

    /**
     * Ejecuta la función de devolución de llamada cuando se realiza una acción.
     * @param {number} columnIndex - Índice de la columna.
     * @param {any} modifiedValue - Valor modificado.
     */
    performAction(columnIndex, modifiedValue) {
        if (this.onEditCallback && typeof this.onEditCallback === "function") {
            // Obtén la fila completa como un arreglo de valores
            const originalValue = this.value;
            const rowValues = this.getRowValues(this.selected.parentNode);
            this.onEditCallback(columnIndex, modifiedValue, originalValue,  rowValues);
        }
    }

    /**
     * Obtiene los valores de una fila como un arreglo.
     * @param {HTMLTableRowElement} row - Fila HTML.
     * @returns {Array} - Arreglo de valores de la fila.
     */
    getRowValues(row) {
        const cells = Array.from(row.cells);
        return cells.map(cell => cell.innerText);
    }

}

// Ejemplo de uso:
const inlineCellModifier1 = new InlineCellModifier("#table1", {
    1: { type: "number" },
    4: { type: "number" },
    5: { type: "number" },
}, (columnIndex, value, originalValue, rowValues) => {
    console.log(`Modified value in column ${columnIndex}: ${value}`);
    console.log("Original value:", originalValue);
    console.log("All values in the row:", rowValues);
});

const inlineCellModifier2 = new InlineCellModifier("#table2", {
    2: { type: "text" },
    3: { type: "number" },
}, (columnIndex, value, originalValue, rowValues) => {
    console.log(`Modified value in column ${columnIndex}: ${value}`);
    console.log("Original value:", originalValue);
    console.log("All values in the row:", rowValues);
});
