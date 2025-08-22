/*"identificador_perfil_riesgo_directo_6_meses": [
{
"indicador": "Mayor plazo vencido",
"valor": "",
"fecha": ""
},
{
"indicador": "Mayor valor vencido",
"valor": "",
"fecha": ""
},*/

/** DTO for identificador_perfil_riesgo_directo_6_meses
 * @typedef {Object} IdentificadorPerfilRiesgoDirecto6MesesDTO
 * @property {string} indicador - The risk indicator
 * @property {string} valor - The value of the indicator
 * @property {Date} fecha - The date of the indicator
 */

function parseDateOrNull(value) {
    if (!value || typeof value !== 'string') return null;

    // If it has the format "DD/MM/YYYY"
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
        const [day, month, year] = value.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        return isNaN(date.getTime()) ? null : date;
    }

    // If it has the format "YYYY-MM-DD" or similar
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
}

function parseIdentificadorPerfilRiesgoDirecto6Meses(identificador_perfil_riesgo_directo_6_meses = []) {
    if (!Array.isArray(identificador_perfil_riesgo_directo_6_meses) || identificador_perfil_riesgo_directo_6_meses.length === 0) {
        return [];
    }

    return identificador_perfil_riesgo_directo_6_meses.map(item => ({
        indicador: item.indicador || '',
        valor: item.valor || '',
        fecha: item.fecha ? parseDateOrNull(item.fecha) : null
    }));
}
module.exports = { parseIdentificadorPerfilRiesgoDirecto6Meses };