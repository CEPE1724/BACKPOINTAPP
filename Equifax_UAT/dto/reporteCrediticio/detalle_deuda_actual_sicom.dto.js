/*{
 "detalle_deuda_actual_sicom": [
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
 "cuota_mensual": 0,
 "dias_morosidad": 0
 }
 ]
}
*/

/** * DTO for detalle_deuda_actual_sicom
 * @typedef {Object} DetalleDeudaActualSicomDTO
 * @property {string} institucion - Nombre de la institución
 * @property {string} fecha_corte - Fecha de corte
 * @property {string} tipo_riesgo - Tipo de riesgo (TITULAR, ADICIONAL)
 * @property {string} tipo_credito - Tipo de crédito (Tarjeta, Prést
 * amo, etc.)
 * @property {number} cupo_monto_original - Monto original del crédito
 * @property {string} fecha_apertura - Fecha de apertura del crédito
 * @property {string} fecha_vencimiento - Fecha de vencimiento del crédito
 * @property {number} total_vencer - Monto total por vencer
 * @property {number} ndi - No devenga interés
 * @property {number} total_vencido - Monto total vencido
 * @property {number} dem_jud - Monto en demanda judicial
 * @property {number} cart_cast - Monto en cartera castigada
 * @property {number} saldo_deuda - Saldo total de la deuda
 * @property {number} cuota_mensual - Cuota mensual del crédito
 * @property {number} dias_morosidad - Días de morosidad
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


function parseDetalleDeudaActualSicom(detalle_deuda_actual_sicom = []) {
    if (!Array.isArray(detalle_deuda_actual_sicom) || detalle_deuda_actual_sicom.length === 0) {
        return [];
    }

    return detalle_deuda_actual_sicom.map(item => ({
        institucion: item.institucion || '',
        fecha_corte: item.fecha_corte ? parseDateOrNull(item.fecha_corte) : null,
        tipo_riesgo: item.tipo_riesgo || '',
        tipo_credito: item.tipo_credito || '',
        cupo_monto_original: Number(item.cupo_monto_original) || 0.00,
        fecha_apertura: item.fecha_apertura ? parseDateOrNull(item.fecha_apertura) : null,
        fecha_vencimiento: item.fecha_vencimiento ? parseDateOrNull(item.fecha_vencimiento) : null,
        total_vencer: Number(item.total_vencer) || 0.00,
        ndi: Number(item.ndi) || 0.00,
        total_vencido: Number(item.total_vencido) || 0.00,
        dem_jud: Number(item.dem_jud) || 0.00,
        cart_cast: Number(item.cart_cast) || 0.00,
        saldo_deuda: Number(item.saldo_deuda) || 0.00,
        cuota_mensual: Number(item.cuota_mensual) || 0.00,
        dias_morosidad: Number(item.dias_morosidad) || 0
    }));
}


module.exports = { parseDetalleDeudaActualSicom };
