/*
[{"monto_total_ope_impagos": 0,"num_total_ope_impagos": 0,"tipo": "OpeImpagos"},{"monto_total_ope_impagos": 0,"num_total_ope_impagos": 0,"tipo": "DemandaJudicial"},{"monto_total_ope_impagos": 0,"num_total_ope_impagos": 0,"tipo": "CarteraCastigada"}]*/


/** * DTO for Resumen Informe
 * @module Equifax_UAT/dto/reporteCrediticio/resumen_informe.dto.js
 * @typedef {Object} ResumenInformeDTO
 *  * @property {number} monto_total_ope_impagos - Monto total de operaciones impagas
 * @property {number} num_total_ope_impagos - Número total de operaciones impagas
 * @property {string} tipo - Tipo de operación  
 * */
function parseResumenInforme(resumen_informe) {
    if (!Array.isArray(resumen_informe) || resumen_informe.length === 0) {
        return [];
    }

    return resumen_informe.map(item => ({
        monto_total_ope_impagos: item.monto_total_ope_impagos || 0,
        num_total_ope_impagos: item.num_total_ope_impagos || 0,
        tipo: item.tipo || ''
    }));
}
module.exports = { parseResumenInforme };