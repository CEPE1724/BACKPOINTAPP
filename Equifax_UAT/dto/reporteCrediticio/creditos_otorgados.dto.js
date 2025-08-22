/*{
 "creditos_otorgados": [
 {
 "institucion": "",
 "estado_operacion": "",
 "tipo_credito": "",
 "valor_operacion": 0,
 "titular": 0,
 "codeudor": 0,
 "garante": 0,
 "fecha_concesion": "2020-01-31",
 "fecha_vencimiento": "2020-01-31"
 }
 ]
}*/

/** * DTO for creditos_otorgados
 * @typedef {Object} CreditosOtorgadosDTO
 * @property {string} institucion
 * @property {string} estado_operacion
 * @property {string} tipo_credito
 * @property {number} valor_operacion
 * @property {number} titular
 * @property {number} codeudor
 * @property {number} garante
 * @property {string} fecha_concesion
 * @property {string} fecha_vencimiento
 */

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
function parseCreditosOtorgados(creditos_otorgados = []) {
    if (!Array.isArray(creditos_otorgados) || creditos_otorgados.length === 0) {
        return [];
    }

    return creditos_otorgados.map(item => ({
        institucion: item.institucion || '',
        estado_operacion: item.estado_operacion || '',
        tipo_credito: item.tipo_credito || '',
        valor_operacion: typeof item.valor_operacion === 'number' ? item.valor_operacion : 0.00,
        titular: typeof item.titular === 'number' ? item.titular : 0.00,
        codeudor: typeof item.codeudor === 'number' ? item.codeudor : 0.00,
        garante: typeof item.garante === 'number' ? item.garante : 0.00,
        fecha_concesion: parseDateOrNull(item.fecha_concesion),
        fecha_vencimiento: parseDateOrNull(item.fecha_vencimiento)
    }));
}

module.exports = {
    parseCreditosOtorgados
};