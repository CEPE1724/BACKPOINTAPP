/*{
 "personas_inhabilitadas": [
 {
 "fecha_inhabilitacion": "2020-01-31",
 "tiempo_inhabilitacion": 0,
 "accion": "",
 "motivo": ""
 }
 ]
}*/
/** * DTO for personas_inhabilitadas
 * @typedef {Object} PersonasInhabilitadasDTO
 * @property {string} fecha_inhabilitacion
 * @property {number} tiempo_inhabilitacion
 * @property {string} accion
 * @property {string} motivo
 **/
function parseDateOrNull(value) {
    if (!value || typeof value !== 'string') return null;

    // Si tiene formato "DD/MM/YYYY"
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
        const [day, month, year] = value.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        return isNaN(date.getTime()) ? null : date;
    }

    // Si tiene formato "YYYY-MM-DD" o similar
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
}

function parsePersonasInhabilitadas(personas_inhabilitadas = []) {
    if (!Array.isArray(personas_inhabilitadas) || personas_inhabilitadas.length === 0) {
        return [];
    }

    return personas_inhabilitadas.map(item => ({
        fecha_inhabilitacion: parseDateOrNull(item.fecha_inhabilitacion),
        tiempo_inhabilitacion: typeof item.tiempo_inhabilitacion === 'number' ? item.tiempo_inhabilitacion : 0,
        accion: item.accion || '',
        motivo: item.motivo || ''
    }));
}
module.exports = { parsePersonasInhabilitadas };