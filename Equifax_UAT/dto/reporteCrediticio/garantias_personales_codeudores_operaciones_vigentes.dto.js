/*{
 "garantias_personales_codeudores_operaciones_vigentes": [
 {
 "tipo_deudor": "",
 "nombre_titular": "",
 "identificacion_titular": "",
 "numero_operacion": "",
 "institucion": "",
 "deuda_total": 0
 }*/

/** * DTO for Garantias Personales Codeudores Operaciones Vigentes
 * @param {Array} garantias_personales_codeudores_operaciones_vigentes - Array of garantias_personales_codeudores_operaciones_vigentes objects
 * @returns {Array} - Array of parsed garantias_personales_codeudores_operaciones_vigentes DTOs
 * @typedef {Object} GarantiasPersonalesCodeudoresOperacionesVigentesDTO
 * @property {string} tipo_deudor - Type of debtor
 * @property {string} nombre_titular - Name of the holder
 * @property {string} identificacion_titular - Identification of the holder
 * @property {string} numero_operacion - Operation number
 * @property {string} institucion - Institution
 * @property {number} deuda_total - Total debt
 */

function parseGarantiasPersonalesCodeudoresOperacionesVigentes(garantias_personales_codeudores_operaciones_vigentes = []) {
    if (!Array.isArray(garantias_personales_codeudores_operaciones_vigentes) || garantias_personales_codeudores_operaciones_vigentes.length === 0) {
        return [];
    }

    return garantias_personales_codeudores_operaciones_vigentes.map(item => ({
        tipo_deudor: item.tipo_deudor || '',
        nombre_titular: item.nombre_titular || '',
        identificacion_titular: item.identificacion_titular || '',
        numero_operacion: item.numero_operacion || '',
        institucion: item.institucion || '',
        deuda_total: Number(item.deuda_total) || 0.00
    }));
}
module.exports = { parseGarantiasPersonalesCodeudoresOperacionesVigentes };