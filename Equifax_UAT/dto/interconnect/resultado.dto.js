/*[{"variable": "CAPACIDAD DE PAGO :","resultado": "$ 297.70"},{"variable": "GASTO FINANCIERO :","resultado": "$ 445.35"},{"variable": "GASTO HOGAR :","resultado": "$ 297.40"},{"variable": "INCOME PREDICTOR V3 :","resultado": "$ 1,487.00"},{"variable": "MONTO SUGERIDO :","resultado": "$ 6,100.00"}]*/

/*
 * DTO for Interconnect Resultado
 * @module Equifax_UAT/dto/interconnect/Resultado.dto.js
 * @typedef {Object} ResultadoDTO
 * @property {string} variable resultado_evaluacion
 * @property {string} variable segmentacion_cliente
 * @property {string} variable modelo_utilizado
 */
 
function parseInterconnectResultado(resultado) {
    if (!Array.isArray(resultado) || resultado.length === 0) {
        return [];
    }

    return resultado.map(item => ({
        variable: item.variable || '',
        resultado: item.resultado || ''
    }));
}
module.exports = { parseInterconnectResultado };