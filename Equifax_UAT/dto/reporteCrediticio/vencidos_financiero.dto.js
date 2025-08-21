/*"historico_vencidos_comercial": [
{
"retroactivo": "Actual",
"saldo_vencido": 0
},
{
"retroactivo": "-6 Meses",
"saldo_vencido": 0
},
{
"retroactivo": "-12 Meses",
"saldo_vencido": 0
}
],*/

/** * DTO for Historico Vencidos Comercial
 * @param {Array} historico_vencidos_comercial - Array of historico_vencidos_comercial objects
 * @returns {Array} - Array of parsed historico_vencidos_comercial DTOs
 * * @typedef {Object} HistoricoVencidosComercialDTO
 * * @property {string} retroactivo - Retroactivo del vencido comercial
 * * @property {number} saldo_vencido - Saldo vencido
 * * @returns {HistoricoVencidosComercialDTO[]}
 * */
function parseHistoricoVencidosComercial(historico_vencidos_comercial = [])
{
    if (!Array.isArray(historico_vencidos_comercial) || historico_vencidos_comercial.length === 0) {
        return [];
    }

    return historico_vencidos_comercial.map(item => ({
        retroactivo: item.retroactivo || '',
        saldo_vencido: Number(item.saldo_vencido) || 0.00,
    }));
}

module.exports = { parseHistoricoVencidosComercial };