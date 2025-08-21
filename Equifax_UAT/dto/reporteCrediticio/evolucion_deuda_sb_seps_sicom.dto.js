/*"evolucion_deuda_sb_seps_sicom": [
{
"fecha_corte": "2017-01-31 00:00:00.000",
"total": 14481.51,
"vencidos": 0,
"opcion": "SB"
},
{
"fecha_corte": "2017-02-28 00:00:00.000",
"total": 14005.99,
"vencidos": 0,
"opcion": "SB"
},
*/

/** * DTO for Evolucion Deuda SB SEPS SICOM
 * @param {Array} evolucion_deuda_sb_seps_sicom - Array of evolucion_de
 * uda_sb_seps_sicom objects
 * @returns {Array} - Array of parsed evolucion_deuda_sb_seps_sicom DTOs
 * @typedef {Object} EvolucionDeudaSBSEPSICOMDTO
 * @property {string} fecha_corte - Fecha de corte
 * @property {number} total - Total de la deuda
 * @property {number} vencidos - Total de vencidos
 * @property {string} opcion - Opción (SB, SEPS, SICOM)
 */



function parseEvolucionDeudaSBSEPSICOM(evolucion_deuda_sb_seps_sicom = []) {
    if (!Array.isArray(evolucion_deuda_sb_seps_sicom) || evolucion_deuda_sb_seps_sicom.length === 0) {
        return [];
    }

    return evolucion_deuda_sb_seps_sicom.map(item => ({
        fecha_corte: item.fecha_corte ? new Date(item.fecha_corte) : null,
        total: Number(item.total) || 0.00,
        vencidos: Number(item.vencidos) || 0.00,
        opcion: item.opcion || ''
    }));
}
module.exports = { parseEvolucionDeudaSBSEPSICOM };
