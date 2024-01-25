# Editable Table

Este proyecto proporciona una implementación en JavaScript para la edición de celdas en tablas HTML directamente en la interfaz de usuario.

## Características

- Edición en línea de celdas en tablas HTML.
- Soporte para tipos de datos específicos por columna.
- Personalización de estilos a través de CSS.

## Uso

1. Clona el repositorio:

   ```bash
   git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   ```

2. Abre el archivo index.html en tu navegador para probar la funcionalidad de la tabla editable.

3. Modifica y personaliza según tus necesidades específicas.

## Configuración
### Configuración de Columnas

Puedes configurar los tipos de datos por columna en el archivo main.js. Por ejemplo:

```javascript
const editableTable1 = new EditableTable("#table1", {
    1: { type: "number" },
    4: { type: "number" },
    5: { type: "number" },
}, (columnIndex, modifiedValue, originalValue, rowValues) => {
    // Lógica de devolución de llamada
    // ...
});
```
### Personalización de Estilos
Los estilos CSS se encuentran en el archivo EditableTable.css y pueden personalizarse según tus preferencias.

## Licencia
Este proyecto está bajo la Licencia MIT.
