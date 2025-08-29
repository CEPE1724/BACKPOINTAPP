/*"valor_deuda_3_sistemas": [
{
"institucion": "Sistema Financiero Regulado SB",
"por_vencer": 2909.38,
"no_devenga_int": 0,
"vencido": 0,
"total": 2909.38,
"demanda_judicial": 0,
"cartera_castigada": 0
},*/

/** * DTO for Valor Deuda 3 Sistemas
 * @param {Array} valor_deuda_3_sistemas - Array of valor_deuda_3_sistemas objects
 * @returns {Array} - Array of parsed valor_deuda_3_sistemas DTOs
 * * @typedef {Object} ValorDeuda3SistemasDTO
 * * @property {string} institucion - Nombre de la institución
 * * @property {number} por_vencer - Monto por vencer
 * * @property {number} no_devenga_int - Monto que no devenga interés
 * * @property {number} vencido - Monto vencido
 * * @property {number} total - Monto total
 * * @property {number} demanda_judicial - Monto en demanda judicial
 * * @property {number} cartera_castigada - Monto en cartera castigada
 * * @returns {ValorDeuda3SistemasDTO[]}
 * */
function parseValorDeuda3Sistemas(valor_deuda_3_sistemas = []) {
    if (!Array.isArray(valor_deuda_3_sistemas) || valor_deuda_3_sistemas.length === 0) {
        return [];
    }

    return valor_deuda_3_sistemas.map(item => ({
        institucion: item.institucion || '',
        por_vencer: Number(item.por_vencer) || 0.00,
        no_devenga_int: Number(item.no_devenga_int) || 0.00,
        vencido: Number(item.vencido) || 0.00,
        total: Number(item.total) || 0.00,
        demanda_judicial: Number(item.demanda_judicial) || 0.00,
        cartera_castigada: Number(item.cartera_castigada) || 0.00,
    }));
}
module.exports = { parseValorDeuda3Sistemas };