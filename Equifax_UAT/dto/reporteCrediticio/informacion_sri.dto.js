/**
 * @typedef {Object} InformacionSRI
 * @property {string} nombre
 * @property {string} actividad
 * @property {string} ruc
 * @property {string} direccion
 * @property {string} estado_contribuyente
 * @property {string} clase_contribuyente
 * @property {string} codigo_ciiu
 * @property {Date|null} fecha_inicio_actividades
 * @property {Date|null} fecha_suspension_definitiva
 * @property {number} numero_establecimiento
 * @property {string} obligado
 * @property {string} nombre_fantasia_comercial
 */

function parseDateOrNull(value) {
    if (!value) return null;
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
}

function parseInformacionSRI(informacion_sri = []) {
    if (!Array.isArray(informacion_sri) || informacion_sri.length === 0) {
        return [];
    }

    return informacion_sri.map(item => ({
        nombre: item.nombre || '',
        actividad: item.actividad || '',
        ruc: item.ruc || '',
        direccion: item.direccion || '',
        estado_contribuyente: item.estado_contribuyente || '',
        clase_contribuyente: item.clase_contribuyente || '',
        codigo_ciiu: item.codigo_ciiu || '',
        fecha_inicio_actividades: parseDateOrNull(item.fecha_inicio_actividades),
        fecha_suspension_definitiva: parseDateOrNull(item.fecha_suspension_definitiva),
        numero_establecimiento: item.numero_establecimiento || 0,
        obligado: item.obligado || '',
        nombre_fantasia_comercial: item.nombre_fantasia_comercial || ''
    }));
}

module.exports = { parseInformacionSRI };
