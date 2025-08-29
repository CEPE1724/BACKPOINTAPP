/*tarjetas_canceladas": [
 {
 "fecha_corte": "2020-01-31",
 "institucion": "",
 "numero_tarjeta": "",
 "fecha_cancelacion": "2020-01-31"
 }*/

/** DTO for parsing canceled credit card data
 * @param {Array} tarjetas_canceladas - Array of canceled credit card data
 * @returns {Array} Parsed canceled credit card data
 * */

function parseDateOrNull(value) {
    if (!value || typeof value !== 'string') return null;

    // If the format is "DD/MM/YYYY"
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
        const [day, month, year] = value.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        return isNaN(date.getTime()) ? null : date;
    }

    // If the format is "YYYY-MM-DD HH:mm:ss.SSS" or similar
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
}

function parseTarjetasCanceladas(tarjetas_canceladas = []) {
    if (!Array.isArray(tarjetas_canceladas) || tarjetas_canceladas.length === 0) {
        return [];
    }

    return tarjetas_canceladas.map(item => ({
        fecha_corte: parseDateOrNull(item.fecha_corte),
        institucion: item.institucion || '',
        numero_tarjeta: item.numero_tarjeta || '',
        fecha_cancelacion: parseDateOrNull(item.fecha_cancelacion)
    }));
}
module.exports = {
    parseTarjetasCanceladas
};