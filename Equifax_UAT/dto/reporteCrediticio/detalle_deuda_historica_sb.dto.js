/*{
 "detalle_deuda_historica_sb": [
 {
 "institucion": "",
 "fecha_corte": "",
 "tipo_riesgo": "",
 "tipo_credito": "",
 "cupo_monto_original": 0,
 "fecha_apertura": "",
 "fecha_vencimiento": "",
 "total_vencer": 0,
 "ndi": 0,
 "total_vencido": 0,
 "dem_jud": 0,
 "cart_cast": 0,
 "saldo_deuda": 0,
 "dias_morosidad": 0
 }
*/

/** DTO FOR EQFX_UAT_detalle_deuda_historica_sb 
 * @typedef {Object} EQFX_UAT_detalle_deuda_historica_sbDTO
 * @property {number} idEQFX_UAT_detalle_deuda_historica_sb
 * @property {number} idEQFX_IdentificacionConsultada
 * @property {string} institucion
 * @property {Date} fecha_corte
 * @property {string} tipo_riesgo
 * @property {string} tipo_credito
 * @property {number} cupo_monto_original
 * @property {Date} fecha_apertura
 * @property {Date} fecha_vencimiento
 * @property {number} total_vencer
 * @property {number} ndi
 * @property {number} total_vencido
 * @property {number} dem_jud
 * @property {number} cart_cast
 * @property {number} saldo_deuda
 * @property {number} dias_morosidad
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

function parseDetalleDeudaHistoricaSb(detalle_deuda_historica_sb = []) {
    if (!Array.isArray(detalle_deuda_historica_sb || detalle_deuda_historica_sb.length === 0)) {
        return [];
    }
    return detalle_deuda_historica_sb.map(item => ({
        institucion: item.institucion || '',
        fecha_corte: parseDateOrNull(item.fecha_corte),
        tipo_riesgo: item.tipo_riesgo || '',
        tipo_credito: item.tipo_credito || '',
        cupo_monto_original: parseFloat(item.cupo_monto_original) || 0.00,
        fecha_apertura: parseDateOrNull(item.fecha_apertura),
        fecha_vencimiento: parseDateOrNull(item.fecha_vencimiento),
        total_vencer: parseFloat(item.total_vencer) || 0.00,
        ndi: parseFloat(item.ndi) || 0.00,
        total_vencido: parseFloat(item.total_vencido) || 0.00,
        dem_jud: parseFloat(item.dem_jud) || 0.00,
        cart_cast: parseFloat(item.cart_cast) || 0.00,
        saldo_deuda: parseFloat(item.saldo_deuda) || 0.00,
        dias_morosidad: parseInt(item.dias_morosidad, 10) || 0
    }));
}
module.exports = {
    parseDetalleDeudaHistoricaSb
};
