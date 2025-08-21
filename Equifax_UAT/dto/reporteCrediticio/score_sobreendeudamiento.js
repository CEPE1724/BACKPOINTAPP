/*[{"rango_score": "769.0 a 806.0","score": 800,"segmentacion": "BAJO","porcentaje": 80,"probabilidad_sobre_endeudamiento": 1.8,"fecha_inicial": "2016-01-31","fecha_final": "2018-12-31"}]*/

/** * DTO for Resumen Informe
 * @module Equifax_UAT/dto/reporteCrediticio/score_sobreendeudamiento.js
 * @typedef {Object} ScoreSobreendeudamientoDTO
 * * @property {string} rango_score - Rango del score de sobreendeudamiento
 * @property {number} score - Puntaje del score de sobreendeudamiento
 * @property {string} segmentacion - Segmentación del score
 * @property {number} porcentaje - Porcentaje asociado al score
 * @property {number} probabilidad_sobre_endeudamiento - Probabilidad de sobreendeudamiento
 * @property {string} fecha_inicial - Fecha inicial del score
 * @property {string} fecha_final - Fecha final del score
 * */

function parseDateOrNull(value) {
    if (!value) return null;
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
}

function parseScoreSobreendeudamiento(score_sobreendeudamiento) {
    if (!Array.isArray(score_sobreendeudamiento) || score_sobreendeudamiento.length === 0) {
        return [];
    }

    return score_sobreendeudamiento.map(item => ({
        rango_score: item.rango_score || '',
        score: item.score || 0,
        segmentacion: item.segmentacion || '',
        porcentaje: item.porcentaje || 0,
        probabilidad_sobre_endeudamiento: item.probabilidad_sobre_endeudamiento || 0,
        fecha_inicial: parseDateOrNull(item.fecha_inicial),
        fecha_final: parseDateOrNull(item.fecha_final)
    }));
}
module.exports = { parseScoreSobreendeudamiento };