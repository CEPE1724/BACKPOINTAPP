/*{
 "entidades_consultados": [
 {
 "nombre_cliente": "Entidad que Consultó",
 "mes1": "May 2025",
 "mes2": "Abr 2025",
 "mes3": "Mar 2025",
 "mes4": "Feb 2025",
 "mes5": "Ene 2025",
 "mes6": "Dic 2024",
 "mes7": "Nov 2024",
 "mes8": "Oct 2024",
 "mes9": "Sep 2024",
 "mes10": "Ago 2024",
 "mes11": "Jul 2024",
 "mes12": "Jun 2024"
 },
*/
/** DTO for EQFX_UAT_entidades_consultados 
 * @param {Array} entidades_consultados
 * @param {number} idEQFX_IdentificacionConsultada
 * @return {Array} Array of EQFX_UAT_entidades_consultados objects
 * */
function parseEntidadesConsultados(entidades_consultados )
{
    if (!Array.isArray(entidades_consultados || []) || entidades_consultados.length === 0) {
        return [];
    }

    return entidades_consultados.map(entidad => ({
        nombre_cliente: entidad.nombre_cliente || '',
        mes1: entidad.mes1 || '',
        mes2: entidad.mes2 || '',
        mes3: entidad.mes3 || '',
        mes4: entidad.mes4 || '',
        mes5: entidad.mes5 || '',
        mes6: entidad.mes6 || '',
        mes7: entidad.mes7 || '',
        mes8: entidad.mes8 || '',
        mes9: entidad.mes9 || '',
        mes10: entidad.mes10 || '',
        mes11: entidad.mes11 || '',
        mes12: entidad.mes12 || ''
    }));
}

module.exports = {
    parseEntidadesConsultados
};  