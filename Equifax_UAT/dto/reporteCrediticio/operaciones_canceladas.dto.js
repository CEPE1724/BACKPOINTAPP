/*peraciones_canceladas": [
 {
 "fecha_corte": "2020-01-31",
 "institucion": "",
 "numero_operacion": "",
 "fecha_cancelacion": "2020-01-31"
 }
*/

/** DTO for parsing operations canceled data
 * @param {Array} operaciones_canceladas - Array of operations canceled data
 * @returns {Array} Parsed operations canceled data
 * */

function parseDateOrNull(value) {
    if (!value || typeof value !== 'string') return null;

    // Si tiene formato "DD/MM/YYYY"
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
        const [day, month, year] = value.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        return isNaN(date.getTime()) ? null : date;
    }

    // Si tiene formato "YYYY-MM-DD HH:mm:ss.SSS" o similar
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
}
function parseOperacionesCanceladas(operaciones_canceladas = []) {
    if (!Array.isArray(operaciones_canceladas) || operaciones_canceladas.length === 0) {
        return [];
    }

    return operaciones_canceladas.map(item => ({
        fecha_corte: parseDateOrNull(item.fecha_corte),
        institucion: item.institucion || '',
        numero_operacion: item.numero_operacion || '',
        fecha_cancelacion: parseDateOrNull(item.fecha_cancelacion)
    }));
}
module.exports = {
    parseOperacionesCanceladas
};