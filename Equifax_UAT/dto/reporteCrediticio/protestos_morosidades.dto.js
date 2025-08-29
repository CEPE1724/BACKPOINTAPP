/*
"protestos_morosidades": [
{
"morosidades": 0,
"protestos": null,
"monto_total_morosidades": 0,
"total_numero_operaciones": 0
}*/

/** * DTO for Protestos y Morosidades
 * @param {Array} protestos_morosidades - Array of protestos_morosidades objects
 * @returns {Object} - Parsed protestos_morosidades DTO
 * * @typedef {Object} ProtestosMorosidadesDTO
 * * @property {number} morosidades - Total de morosidades
 * * @property {number} protestos - Total de protestos
 * * @property {number} monto_total_morosidades - Monto total de moros
 * * @property {number} total_numero_operaciones - Total de operaciones
 *  * @returns {ProtestosMorosidadesDTO}
 * */

function parseProtestosMorosidades(protestos_morosidades = []) {
    if (!Array.isArray(protestos_morosidades) || protestos_morosidades.length === 0) {
        return {
            morosidades: 0,
            protestos: null,
            monto_total_morosidades: 0.00,
            total_numero_operaciones: 0
        };
    }

    const item = protestos_morosidades[0]; // Accede al primer elemento del array

    return {
        morosidades: Number(item.morosidades) || 0,
        protestos: item.protestos || null,
        monto_total_morosidades: Number(item.monto_total_morosidades) || 0.00,
        total_numero_operaciones: Number(item.total_numero_operaciones) || 0
    };
}
module.exports = { parseProtestosMorosidades };
