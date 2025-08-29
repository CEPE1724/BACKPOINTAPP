/*"detalle_deuda_historica_seps": [
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

function parseDetalleDeudaHistoricaSeps(detalle_deuda_historica_seps = []) {
    if (!Array.isArray(detalle_deuda_historica_seps) || detalle_deuda_historica_seps.length === 0) {
        return [];
    }

    return detalle_deuda_historica_seps.map(item => ({
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
    parseDetalleDeudaHistoricaSeps
};
