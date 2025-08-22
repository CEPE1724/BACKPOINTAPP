/*{
 "cuota_estimada_mensual": [
 {
 "pago": 0,
 "numero_creditos_comercial": 0,
 "total_vencido": 0,
 "total_demanda": 0,
 "total_cartera": 0,
 "numero_creditos_iece": 0,
 "numero_operaciones_excluidas": 0
 }*/

/** * DTO for cuota_estimada_mensual
 * @typedef {Object} CuotaEstimadaMensualDTO
 * @property {number} pago
 * @property {number} numero_creditos_comercial
 * @property {number} total_vencido
 * @property {number} total_demanda
 * @property {number} total_cartera
 * @property {number} numero_creditos_iece
 * @property {number} numero_operaciones_excluidas
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

function parseCuotaEstimadaMensual(cuota_estimada_mensual = []) {
    if (!Array.isArray(cuota_estimada_mensual) || cuota_estimada_mensual.length === 0) {
        return [];
    }

    return cuota_estimada_mensual.map(item => ({
        pago: typeof item.pago === 'number' ? item.pago : 0.00,
        numero_creditos_comercial: typeof item.numero_creditos_comercial === 'number' ? item.numero_creditos_comercial : 0,
        total_vencido: typeof item.total_vencido === 'number' ? item.total_vencido : 0.00,
        total_demanda: typeof item.total_demanda === 'number' ? item.total_demanda : 0.00,
        total_cartera: typeof item.total_cartera === 'number' ? item.total_cartera : 0.00,
        numero_creditos_iece: typeof item.numero_creditos_iece === 'number' ? item.numero_creditos_iece : 0,
        numero_operaciones_excluidas: typeof item.numero_operaciones_excluidas === 'number' ? item.numero_operaciones_excluidas : 0
    }));
}
module.exports = { parseCuotaEstimadaMensual };