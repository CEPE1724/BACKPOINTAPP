
/**
 * @typedef {Object} SegmentacionDTO
 * @property {string} resultado_evaluacion
 * @property {string} segmentacion_cliente
 * @property {string} modelo_utilizado
 */


function parseSegmentacion(resultado_segmentacion) {

    if (!Array.isArray(resultado_segmentacion) || resultado_segmentacion.length === 0) {
        return {
            resultado_evaluacion: '',
            segmentacion_cliente: '',
            modelo_utilizado: ''
        };
    }

    const segmento = resultado_segmentacion[0]; // Accede al primer elemento del array

    return {
        resultado_evaluacion: segmento.resultado_evaluacion || '',
        segmentacion_cliente: segmento.segmentacion_cliente || '',
        modelo_utilizado: segmento.modelo_utilizado || ''
    };
}
module.exports = { parseSegmentacion };