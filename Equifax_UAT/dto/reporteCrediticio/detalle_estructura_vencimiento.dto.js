/*{
 "detalle_estructura_vencimiento": [
 {
 "fecha_corte": "2020-01-31",
 "vencido_0_a_1": 0,
 "vencido_1_a_2": 0,
 "vencido_2_a_3": 0,
 "vencido_3_a_6": 0,
 "vencido_6_a_9": 0,
 "vencido_9_a_12": 0,
 "vencido_12_a_24": 0,
 "vencido_24": 0,
 "vencido_36": 0,
 "vencido": 0,
 "no_devenga_int": 0,
 "demanda_judicial": 0,
 "cartera_castigada": 0
 }
 ]
}*/

/**
 * @typedef {Object} DetalleEstructuraVencimientoDTO
 * @property {string} fecha_corte - Fecha de corte del registro
 * @property {number} vencido_0_a_1 - Monto vencido de 0 a 1 mes
 * @property {number} vencido_1_a_2 - Monto vencido de 1 a 2 meses
 * @property {number} vencido_2_a_3 - Monto vencido de 2 a 3 meses
 * @property {number} vencido_3_a_6 - Monto vencido de 3 a 6 meses
 * @property {number} vencido_6_a_9 - Monto vencido de 6 a 9 meses
 * @property {number} vencido_9_a_12 - Monto vencido de 9 a 12 meses
 * @property {number} vencido_12_a_24 - Monto vencido de 12 a 24 meses
 * @property {number} vencido_24 - Monto vencido de 24 a 36 meses
 * @property {number} vencido_36 - Monto vencido de más de 36 meses
 * @property {number} vencido - Monto total vencido
 * @property {number} no_devenga_int - Monto que no devenga intereses
 * @property {number} demanda_judicial - Monto en demanda judicial
 * @property {number} cartera_castigada - Monto de cartera castigada
 **/
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

function parseDetalleEstructuraVencimiento(detalle_estructura_vencimiento = []) {
    if (!Array.isArray(detalle_estructura_vencimiento) || detalle_estructura_vencimiento.length === 0) {
        return [];
    }

    return detalle_estructura_vencimiento.map(item => ({
        fecha_corte: parseDateOrNull(item.fecha_corte),
        vencido_0_a_1: typeof item.vencido_0_a_1 === 'number' ? item.vencido_0_a_1 : 0.00,
        vencido_1_a_2: typeof item.vencido_1_a_2 === 'number' ? item.vencido_1_a_2 : 0.00,
        vencido_2_a_3: typeof item.vencido_2_a_3 === 'number' ? item.vencido_2_a_3 : 0.00,
        vencido_3_a_6: typeof item.vencido_3_a_6 === 'number' ? item.vencido_3_a_6 : 0.00,
        vencido_6_a_9: typeof item.vencido_6_a_9 === 'number' ? item.vencido_6_a_9 : 0.00,
        vencido_9_a_12: typeof item.vencido_9_a_12 === 'number' ? item.vencido_9_a_12 : 0.00,
        vencido_12_a_24: typeof item.vencido_12_a_24 === 'number' ? item.vencido_12_a_24 : 0.00,
        vencido_24: typeof item.vencido_24 === 'number' ? item.vencido_24 : 0.00,
        vencido_36: typeof item.vencido_36 === 'number' ? item.vencido_36 : 0.00,
        vencido: typeof item.vencido === 'number' ? item.vencido : 0.00,
        no_devenga_int: typeof item.no_devenga_int === 'number' ? item.no_devenga_int : 0.00,
        demanda_judicial: typeof item.demanda_judicial === 'number' ? item.demanda_judicial : 0.00,
        cartera_castigada: typeof item.cartera_castigada === 'number' ? item.cartera_castigada : 0.00
    }));

}
module.exports = { parseDetalleEstructuraVencimiento };