/*
{
"institucion": "BCO DE GUAYAQUIL",
"emisor": "AMERICAN EXPRESS",
"antiguedad": 0,
"cupo": 0,
"saldo_actual": 0,
"saldo_promedio_ultimos_6_meses": 0,
"porcentaje_uso_tarjeta": 0
},*/

/** * DTO for detalle_tarjetas
 * @typedef {Object} DetalleTarjetasDTO
 * @property {string} institucion - Nombre de la institución financiera
 * @property {string} emisor - Nombre del emisor de la tarjeta
 * @property {number} antiguedad - Antigüedad de la tarjeta en años
 * @property {number} cupo - Cupo de la tarjeta
 * @property {number} saldo_actual - Saldo actual de la tarjeta
 * @property {number} saldo_promedio_ultimos_6_meses - Saldo promedio de los últimos 6 meses
 * @property {number} porcentaje_uso_tarjeta - Porcentaje de uso de la tarjeta
 */

function parseDetalleTarjetas(detalle_tarjetas = []) {
    if (!Array.isArray(detalle_tarjetas) || detalle_tarjetas.length === 0) {
        return [];
    }
    return detalle_tarjetas.map(item => ({
        institucion: item.institucion || '',
        emisor: item.emisor || '',
        antiguedad: typeof item.antiguedad === 'number' ? item.antiguedad : 0,
        cupo: typeof item.cupo === 'number' ? item.cupo : 0,
        saldo_actual: typeof item.saldo_actual === 'number' ? item.saldo_actual : 0,
        saldo_promedio_ultimos_6_meses: typeof item.saldo_promedio_ultimos_6_meses === 'number' ? item.saldo_promedio_ultimos_6_meses : 0,
        porcentaje_uso_tarjeta: typeof item.porcentaje_uso_tarjeta === 'number' ? item.porcentaje_uso_tarjeta : 0
    }));
}
module.exports = { parseDetalleTarjetas };