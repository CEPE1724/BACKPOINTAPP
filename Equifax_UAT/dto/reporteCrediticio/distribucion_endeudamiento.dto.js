/*"distribucion_endeudamiento": [
{
"fecha_corte": "2018-12-31 00:00:00.000",
"institucion": "PRODUBANCO",
"tipo_credito": "Consumo",
"saldo_deuda": 2909.38,
"demanda_judicial": 0,
"cartera_castigada": 0,
"titular": 2909.38,
"garante": 0,
"codeudor": 0,
"tarjeta_credito": 2909.38,
"acuerdo_concordatorio": null,
"detalle": null,
"Opcion": "SB"
}*/

/** * DTO for distribucion_endeudamiento
 * @typedef {Object} DistribucionEndeudamientoDTO
 * @property {string} fecha_corte - Fecha de corte del crédito
 * @property {string} institucion - Nombre de la institución financiera
 * @property {string} tipo_credito - Tipo de crédito
 * @property {number} saldo_deuda - Saldo de la deuda
 * @property {number} demanda_judicial - Monto en demanda judicial
 * @property {number} cartera_castigada - Monto de cartera castigada
 * @property {number} titular - Monto a nombre del titular
 * @property {number} garante - Monto a nombre del garante
 * @property {number} codeudor - Monto a nombre del codeudor
 * @property {number} tarjeta_credito - Monto de tarjeta de crédito
 * @property {string} acuerdo_concordatorio - Detalles del acuerdo concordatorio
 * @property {string} detalle - Detalles adicionales
 * @property {string} opcion - Opción del crédito (SB, SEPS, SICOM)
 * @property {Date} FechaSistema - Fecha y hora del sistema cuando se creó el registro
 */

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

function parseDistribucionEndeudamiento(distribucion_endeudamiento = []) {
    if (!Array.isArray(distribucion_endeudamiento) || distribucion_endeudamiento.length === 0) {
        return [];
    }
    return distribucion_endeudamiento.map(item => ({
        fecha_corte: item.fecha_corte ? parseDateOrNull(item.fecha_corte) : null,
        institucion: item.institucion || '',
        tipo_credito: item.tipo_credito || '',
        saldo_deuda: Number(item.saldo_deuda) || 0.00,
        demanda_judicial: Number(item.demanda_judicial) || 0.00,
        cartera_castigada: Number(item.cartera_castigada) || 0.00,
        titular: Number(item.titular) || 0.00,
        garante: Number(item.garante) || 0.00,
        codeudor: Number(item.codeudor) || 0.00,
        tarjeta_credito: Number(item.tarjeta_credito) || 0.00,
        acuerdo_concordatorio: item.acuerdo_concordatorio || '',
        detalle: item.detalle || '',
        opcion: item.Opcion || '',
        FechaSistema: new Date()
    }));
}
module.exports = {
    parseDistribucionEndeudamiento
};

