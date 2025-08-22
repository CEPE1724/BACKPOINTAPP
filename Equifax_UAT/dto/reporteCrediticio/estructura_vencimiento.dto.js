/*"estructura_vencimiento": [
{
"fecha_corte": "2018-12-31 00:00:00.000",
"institucion": "PRODUBANCO",
"por_vencer": 2909.38,
"vencido": 0,
"no_devenga_int": 0,
"saldo_deuda": 2909.38,
"demanda_judicial": 0,
"cartera_castigada": 0,
"acuerdo_concordatorio": null,
"opcion": "SB"
}*/

/** * DTO for estructura_vencimiento
 * @typedef {Object} EstructuraVencimientoDTO
 * @property {string} fecha_corte
 * @property {string} institucion
 * @property {number} por_vencer
 * @property {number} vencido
 * @property {number} no_devenga_int
 * @property {number} saldo_deuda
 * @property {number} demanda_judicial
 * @property {number} cartera_castigada
 * @property {string|null} acuerdo_concordatorio
 * @property {string} opcion
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

function parseEstructuraVencimiento(estructura_vencimiento = []) {
    if (!Array.isArray(estructura_vencimiento) || estructura_vencimiento.length === 0) {
        return [];
    }

    return estructura_vencimiento.map(item => ({
        fecha_corte: parseDateOrNull(item.fecha_corte),
        institucion: item.institucion || '',
        por_vencer: parseFloat(item.por_vencer) || 0.00,
        vencido: parseFloat(item.vencido) || 0.00,
        no_devenga_int: parseFloat(item.no_devenga_int) || 0.00,
        saldo_deuda: parseFloat(item.saldo_deuda) || 0.00,
        demanda_judicial: parseFloat(item.demanda_judicial) || 0.00,
        cartera_castigada: parseFloat(item.cartera_castigada) || 0.00,
        acuerdo_concordatorio: item.acuerdo_concordatorio || null,
        opcion: item.opcion || ''
    }));
}

module.exports = {
    parseEstructuraVencimiento
};