/*{
 "garantias_personales_codeudores_operaciones_no_vigentes": [
 {
 "tipo_deudor": "",
 "fecha_concesion": "2020-01-31",
 "fecha_eliminacion": "2020-01-31",
 "numero_documento": "",
 "nombre_titular": "",
 "institucion": "",
 "numero_operacion": "",
 "valor_operacion": 0,
 "fecha_cancelacion": "2020-01-31"
 }
*/

/** * DTO for Garantias Personales Codeudores Operaciones No Vigentes
 * @param {Array} garantias_personales_codeudores_operaciones_no_vigentes - Array of garantias_personales_codeudores_operaciones_no_vigentes objects
 * @returns {Array} - Array of parsed garantias_personales_codeudores_operaciones_no_vigentes DTOs
 * @typedef {Object} GarantiasPersonalesCodeudoresOperacionesNoVigentesDTO
 * @property {string} tipo_deudor - Tipo de deudor
 * @property {string} fecha_concesion - Fecha de concesión
 * @property {string} fecha_eliminacion - Fecha de eliminación
 * @property {string} numero_documento - Número de documento
 * @property {string} nombre_titular - Nombre del titular
 * @property {string} institucion - Institución
 * @property {string} numero_operacion - Número de operación
 * @property {number} valor_operacion - Valor de operación
 * @property {string} fecha_cancelacion - Fecha de cancelación
 * */
function parseDateOrNull(value) {
    if (!value || typeof value !== 'string') return null;

    // Si tiene formato "DD/MM/YYYY"
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
        const [day, month, year] = value.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        return isNaN(date.getTime()) ? null : date;
    }

    // Si tiene formato "YYYY-MM-DD HH:mm:ss.SSS" o similar
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
}


function parseGarantiasPersonalesCodeudoresOperacionesNoVigentes(garantias_personales_codeudores_operaciones_no_vigentes = []) {
   console.log(`Parsing garantias_personales_codeudores_operaciones_no_vigentes...${JSON.stringify(garantias_personales_codeudores_operaciones_no_vigentes)}`);
    if (!Array.isArray(garantias_personales_codeudores_operaciones_no_vigentes) || garantias_personales_codeudores_operaciones_no_vigentes.length === 0) {
        return [];
    }

    return garantias_personales_codeudores_operaciones_no_vigentes.map(item => ({
        tipo_deudor: typeof item.tipo_deudor === 'string' ? item.tipo_deudor.trim() : '',
        fecha_concesion: parseDateOrNull(item.fecha_concesion),
        fecha_eliminacion: parseDateOrNull(item.fecha_eliminacion),
        numero_documento: item.numero_documento || '',
        nombre_titular: item.nombre_titular || '',
        institucion: item.institucion || '',
        numero_operacion: item.numero_operacion || '',
        valor_operacion: parseFloat(item.valor_operacion) || 0.00,
        fecha_cancelacion: parseDateOrNull(item.fecha_cancelacion)
    }));
}

module.exports = {
    parseGarantiasPersonalesCodeudoresOperacionesNoVigentes
};