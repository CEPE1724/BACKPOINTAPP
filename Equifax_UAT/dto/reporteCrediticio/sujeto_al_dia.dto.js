/*{
 "sujeto_al_dia": [
 {
 "institucion": "CONECEL - telf: 042515555",
 "fecha_corte": "2018-12-31 00:00:00.000",
 "mensaje": "CLIENTE AL DIA EN SUS PAGOS"
 }
*/

/** * DTO for sujeto_al_dia
 * @typedef {Object} SujetoAlDiaDTO
 * @property {string} institucion - The institution name
 * @property {string} fecha_corte - The cut-off date
 * @property {string} mensaje - The message
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

function parseSujetoAlDia(sujeto_al_dia = []) {
    if (!Array.isArray(sujeto_al_dia) || sujeto_al_dia.length === 0) {
        return [];
    }

    return sujeto_al_dia.map(item => ({
        institucion: item.institucion || '',
        fecha_corte: item.fecha_corte ? parseDateOrNull(item.fecha_corte) : null,
        mensaje: item.mensaje || ''
    }));
}
module.exports = { parseSujetoAlDia };
