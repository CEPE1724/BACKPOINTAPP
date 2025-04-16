const { AppDataSource } = require("../../ApiCobrador/api/config/database");
const { body, validationResult } = require('express-validator');

require('dotenv').config({ path: '../../.env' });  // Cargar las variables de entorno desde el archivo .env
// Función para generar la URL amigable


// Controlador
function formatUrl(Grupo, SubGrupo, nombreComercial, sku) {
    const formatString = (str) =>
        str
            .toLowerCase()
            .normalize('NFD') // Normaliza caracteres acentuados
            .replace(/[\u0300-\u036f]/g, '') // Elimina diacríticos
            .replace(/[^\w\s-]/g, '') // Elimina caracteres especiales excepto guiones
            .trim()
            .replace(/\s+/g, '-'); // Reemplaza espacios con guiones

    const urlGrupo = formatString(Grupo);
    const urlSubGrupo = formatString(SubGrupo);
    const urlNombre = formatString(nombreComercial);

    return `${urlGrupo}-${urlSubGrupo}-${urlNombre}-${sku}`;
}

// Controlador principal
exports.Baratazos_WEB_WP = async (req, res) => {
    try {
        const result = await AppDataSource.query(`EXEC dbo.WEB_Baratazos_SP`);

        if (!result || result.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'No se encontraron baratazos',
                data: null,
                totalRecords: 0,
            });
        }

        const marketplaceUrl = process.env.MARKETPLACE_URL || 'https://www.point.com.ec/'; // URL base del marketplace

        const data = result.map((p) => {
            const {
                Codigo,
                Titulo,
                Descripcion,
                Imagen,
                PrecioAntes,
                PrecioPromocional,
                Grupo,
                SubGrupo,
                idWEB_Baratazos,
            } = p;

            const Url = `${marketplaceUrl}productobaratazo/` +
                formatUrl(Grupo || '', SubGrupo || '', Titulo || '', idWEB_Baratazos || 0);

            return {
                Codigo,
                Titulo,
                Descripcion,
                PrecioAntes,
                PrecioPromocional,
                Imagen,
                Url,
            };
        });

        return res.status(200).json({
            status: 'success',
            message: 'Baratazos obtenidos.',
            data,
            totalRecords: data.length,
        });
    } catch (err) {
        console.error("Error al ejecutar el procedimiento almacenado:", err);
        return res.status(500).json({
            status: 'error',
            message: 'Error interno del servidor',
            data: null,
            totalRecords: 0,
        });
    }
}

exports.Ofertas_WEB_WP = async (req, res) => {
    try {
        const result = await AppDataSource.query(`EXEC dbo.WEB_Ofertas_SP`);

        if (!result || result.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'No se encontraron baratazos',
                data: null,
                totalRecords: 0,
            });
        }

        const marketplaceUrl = process.env.MARKETPLACE_URL || 'https://www.point.com.ec/'; // URL base del marketplace

        const data = result.map((p) => {
            const {
                Titulo,
                Descripcion,
                Imagen,
                PrecioTarjeta,
                Grupo,
                SubGrupo,
                idWEB_Ofertas,
            } = p;

            const Url = `${marketplaceUrl}productooferta/` +
                formatUrl(Grupo || '', SubGrupo || '', Titulo || '', idWEB_Ofertas || 0);

            return {
                Titulo,
                Descripcion,
                Precio: PrecioTarjeta,
                Imagen,
                Url,
            };
        });

        return res.status(200).json({
            status: 'success',
            message: 'Ofertas obtenidas.',
            data,
            totalRecords: data.length,
        });
    } catch (err) {
        console.error("Error al ejecutar el procedimiento almacenado:", err);
        return res.status(500).json({
            status: 'error',
            message: 'Error interno del servidor',
            data: null,
            totalRecords: 0,
        });
    }
}

exports.productosWEB_WP = async (req, res) => {
    try {
        const result = await AppDataSource.query(`EXEC dbo.WEB_Productos_SP_Lia`);

        if (!result || result.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'No se encontraron baratazos',
                data: null,
                totalRecords: 0,
            });
        }

        const marketplaceUrl = process.env.MARKETPLACE_URL || 'https://www.point.com.ec/'; // URL base del marketplace

        const data = result.map((p) => {
            const {
                Codigo,
                Titulo,
                Descripcion,
                Imagen,
                Tarjeta,
                Grupo,
                Subgrupo,
                sku,
            } = p;

            const Url = `${marketplaceUrl}producto/` +
                formatUrl(Grupo || '', Subgrupo || '', Titulo || '', sku || 0);

            return {
                Codigo,
                Titulo,
                Descripcion,
                Precio: Tarjeta,
                Imagen,
                Url,
            };
        });

        return res.status(200).json({
            status: 'success',
            message: 'Productos obtenidos.',
            data,
            totalRecords: data.length,
        });
    } catch (err) {
        console.error("Error al ejecutar el procedimiento almacenado:", err);
        return res.status(500).json({
            status: 'error',
            message: 'Error interno del servidor',
            data: null,
            totalRecords: 0,
        });
    }
}