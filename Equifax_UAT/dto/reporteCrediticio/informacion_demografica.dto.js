/*{
 "informacion_demografica": [
 {
 "fecha_nacimiento": "10 de Septiembre de 1945",
 "educacion": "Sin Información.",
 "provincia": "AZUAY||||",
 "canton": "CUENCA|-|||",
 "direcciones": "MARISCAL LA3 Y CALLE EDUARDO CRESPO MALO|AVENIDA 6
486 MARTHA BUCARAM DE ROLDOS EJIDO|||",
 "coordenada_x": "-2.8908003700||||",
 "coordenada_y": "-79.0196816800||||",
 "numero_telefonico_convencional": "687675772||",
 "numero_telefonico_celular": "667332854||"
 }*/

 /** DTO for parsing demographic information data
 * @param {Array} informacion_demografica - Array of demographic information data
 */

 function parseInformacionDemografica(informacion_demografica) {
    if (!Array.isArray(informacion_demografica) || informacion_demografica.length === 0) {
        return [];
    }

    return informacion_demografica.map(item => ({
        fecha_nacimiento: item.fecha_nacimiento || '',
        educacion: item.educacion || '',
        provincia: item.provincia || '',
        canton: item.canton || '',
        direcciones: item.direcciones || '',
        coordenada_x: item.coordenada_x || '',
        coordenada_y: item.coordenada_y || '',
        numero_telefonico_convencional: item.numero_telefonico_convencional || '',
        numero_telefonico_celular: item.numero_telefonico_celular || ''
    }));

}

module.exports = {
    parseInformacionDemografica
};
