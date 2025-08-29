/*{
 "detalle_deuda_historica_sicom": [
 {
 "institucion": "CONECEL",
 "fecha_corte": "2017-10-31 00:00:00.000",
 "tipo_riesgo": "TITULAR",
 "tipo_credito": "Consumo",
 "cupo_monto_original": 0,
 "fecha_apertura": "2015-12-01 00:00:00.000",
 "fecha_vencimiento": "2017-12-01 00:00:00.000",
 "total_vencer": 0,
 "ndi": 0,
 "total_vencido": 0,
 "dem_jud": 0,
 "cart_cast": 0,
 "saldo_deuda": 0,
"dias_morosidad": 0
 }*/

/** DTO FOR EQFX_UAT_detalle_deuda_historica_sicom
 * @typedef {Object} EQFX_UAT_detalle_deuda_historica_sicomDTO
 * @property {number} idEQFX_UAT_detalle_deuda_historica_s
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

function parseDetalleDeudaHistoricaSicom(detalle_deuda_historica_sicom = []) {
    if (!Array.isArray(detalle_deuda_historica_sicom) || detalle_deuda_historica_sicom.length === 0) {
        return [];
    }

    return detalle_deuda_historica_sicom.map(item => ({
        institucion: item.institucion || '',
        fecha_corte: parseDateOrNull(item.fecha_corte),
        tipo_riesgo: item.tipo_riesgo || '',
        tipo_credito: item.tipo_credito || '',
        cupo_monto_original: item.cupo_monto_original || 0,
        fecha_apertura: parseDateOrNull(item.fecha_apertura),
        fecha_vencimiento: parseDateOrNull(item.fecha_vencimiento),
        total_vencer: item.total_vencer || 0,
        ndi: item.ndi || 0,
        total_vencido: item.total_vencido || 0,
        dem_jud: item.dem_jud || 0,
        cart_cast: item.cart_cast || 0,
        saldo_deuda: item.saldo_deuda || 0,
        dias_morosidad: item.dias_morosidad || 0
    }));
}

module.exports = {
    parseDetalleDeudaHistoricaSicom
};
