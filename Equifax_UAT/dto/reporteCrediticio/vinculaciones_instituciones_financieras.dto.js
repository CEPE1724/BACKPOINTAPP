/*{
 "vinculaciones_instituciones_financieras": [
 {
 "institucion": "",
 "vinculacion": "",
 "causal": ""
 }
*/

/** * DTO for Vinculaciones Instituciones Financieras
 * @param {Array} vinculaciones_instituciones_financieras - Array of vinculaciones_instituciones_financieras objects
 * @returns {Array} - Array of parsed vinculaciones instituciones financieras DTOs
 */
function parseVinculacionesInstitucionesFinancieras(vinculaciones_instituciones_financieras = []) {
    if (!Array.isArray(vinculaciones_instituciones_financieras) || vinculaciones_instituciones_financieras.length === 0) {
        return [];
    }

    return vinculaciones_instituciones_financieras.map(item => ({
        institucion: item.institucion || '',
        vinculacion: item.vinculacion || '',
        causal: item.causal || ''
    }));
}

module.exports = {
    parseVinculacionesInstitucionesFinancieras
};