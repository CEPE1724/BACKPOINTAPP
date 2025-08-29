/**
 * DTO for Interconnect Resultado Politicas
 * @module Equifax_UAT/dto/interconnect/interconnect.resultado_politicas.dto.js
 * @typedef {Object} InterconnectResultadoPoliticasDTO
 * @property {string} politica - Nombre de la política
 * @property {string} valor - Valor de la política
 * @property {string} decision - Decisión tomada
 */

function parseInterconnectResultadoPoliticas(resultado_politicas) {
    if (!Array.isArray(resultado_politicas) || resultado_politicas.length === 0) {
        return [];
    }

    return resultado_politicas.map(politica => ({
        politica: politica.politica || '',
        valor: politica.valor || '',
        decision: politica.decision || ''
    }));
}
module.exports = { parseInterconnectResultadoPoliticas };