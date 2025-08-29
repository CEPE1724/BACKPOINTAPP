/*{
 "mantiene_historial_crediticio": [
 {
 "titulo": "Mantiene historial Crediticio desde: ",
 "primera_fecha": "2016-12-31 00:00:00.000"
 }
 ]
}
*/

/** * DTO for mantiene_historial_crediticio
 * @typedef {Object} MantieneHistorialCrediticioDTO
 * @property {string} titulo - Título de la sección
 * @property {string} primera_fecha - Fecha de inicio del historial crediticio
 */
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

function parseMantieneHistorialCrediticio(mantiene_historial_crediticio = []) {
    if (!Array.isArray(mantiene_historial_crediticio) || mantiene_historial_crediticio.length === 0) {
        return [];
    }

    return mantiene_historial_crediticio.map(item => ({
        titulo: item.titulo || '',
        primera_fecha: item.primera_fecha ? parseDateOrNull(item.primera_fecha) : null
    }));
}
module.exports = { parseMantieneHistorialCrediticio };