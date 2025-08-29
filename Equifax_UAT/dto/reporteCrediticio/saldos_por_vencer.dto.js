/*{
 "saldos_por_vencer": [
 {
 "fecha_corte": "2020-01-31",
 "institucion": "",
 "total_por_vencer": 0,
 "por_vencer_0_a_1": 0,
 "por_vencer_1_a_3": 0,
 "por_vencer_3_a_6": 0,
 "por_vencer_6_a_12": 0,
 "por_vencer_12": 0
 }
 ]
}
*/

/** * DTO for saldos_por_vencer
 * @typedef {Object} SaldosPorVencerDTO
 * @property {string} fecha_corte - Fecha de corte
 * @property {string} institucion - Institución
 * @property {number} total_por_vencer - Total por vencer
 * @property {number} por_vencer_0_a_1 - Por vencer de 0 a 1
 * @property {number} por_vencer_1_a_3 - Por vencer de 1 a 3
 * @property {number} por_vencer_3_a_6 - Por vencer de 3 a 6
 * @property {number} por_vencer_6_a_12 - Por vencer de 6 a 12
 * @property {number} por_vencer_12 - Por vencer de 12 o más
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

function parseSaldosPorVencer(saldos_por_vencer = []) {
    if (!Array.isArray(saldos_por_vencer) || saldos_por_vencer.length === 0) {
        return [];
    }

    return saldos_por_vencer.map(item => ({
        fecha_corte: parseDateOrNull(item.fecha_corte),
        institucion: item.institucion || '',
        total_por_vencer: typeof item.total_por_vencer === 'number' ? item.total_por_vencer : 0.00,
        por_vencer_0_a_1: typeof item.por_vencer_0_a_1 === 'number' ? item.por_vencer_0_a_1 : 0.00,
        por_vencer_1_a_3: typeof item.por_vencer_1_a_3 === 'number' ? item.por_vencer_1_a_3 : 0.00,
        por_vencer_3_a_6: typeof item.por_vencer_3_a_6 === 'number' ? item.por_vencer_3_a_6 : 0.00,
        por_vencer_6_a_12: typeof item.por_vencer_6_a_12 === 'number' ? item.por_vencer_6_a_12 : 0.00,
        por_vencer_12: typeof item.por_vencer_12 === 'number' ? item.por_vencer_12 : 0.00
    }));
}

module.exports = { parseSaldosPorVencer };