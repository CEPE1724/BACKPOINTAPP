/*{
 "mensaje_califica_detalle_tarjetas": [
 {
 "mensaje": ""
 }
*/

/** DTO for mensaje_califica_detalle_tarjetas   
 * @typedef {Object} mensaje_califica_detalle_tarjetasDTO
 * @property {string} mensaje - The message content.
 */

 function parseMensajeCalificaDetalleTarjetas(mensaje_califica_detalle_tarjetas) {
    return mensaje_califica_detalle_tarjetas.map(item => ({
        mensaje: item.mensaje || ''
    }));
}

module.exports = {
    parseMensajeCalificaDetalleTarjetas
};
