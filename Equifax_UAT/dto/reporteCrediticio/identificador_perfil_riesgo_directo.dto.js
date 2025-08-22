/*{
 "identificador_perfil_riesgo_directo": [
 {
 "indicador": "Mayor plazo vencido",
 "valor": "",
 "fecha": ""
 },
 {
 "indicador": "Mayor valor vencido",
 "valor": "",
 "fecha": ""
 },
 {
 "indicador": "Endeudamiento promedio",
 "valor": "0.0",
 "fecha": ""
 }
*/

/** DTO /** * DTO for identificador_perfil_riesgo_directo
 * @typedef {Object} IdentificadorPerfilRiesgoDirectoDTO
 * @property {string} indicador - Indicador del perfil de riesgo directo
 * @property {string} valor - Valor asociado al indicador
 * @property {string} fecha - Fecha asociada al indicador
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
function parseIdentificadorPerfilRiesgoDirecto(identificador_perfil_riesgo_directo = []) {
  ;
    if (!Array.isArray(identificador_perfil_riesgo_directo) || identificador_perfil_riesgo_directo.length === 0) {
        return [];
    }
    

    return identificador_perfil_riesgo_directo.map(item => ({
        indicador: item.indicador || '',
        valor: item.valor || '',
        fecha: item.fecha ? parseDateOrNull(item.fecha) : null
    }));
}

module.exports = { parseIdentificadorPerfilRiesgoDirecto };