// ./ApiCobrador/api/config/auth.js
require('dotenv').config({ path: '../../.env' });  // Cargar las variables de entorno desde el archivo .env
const jwt = require('jsonwebtoken');
const secretKey = process.env.FIXED_TOKEN_LIA;  // Clave secreta para verificar el token

// Middleware para validar el token
const validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];  // Obtenemos el token del encabezado 'Authorization'

    // Si el token está presente
    if (authHeader) {
        const token = authHeader.split(' ')[1];  // El formato debería ser 'Bearer token'

        // Verificamos el token con la clave secreta
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                // Si el token no es válido, respondemos con error
                return res.status(403).json({
                    status: 'error',
                    message: 'Forbidden: Invalid token',
                    data: null  // No hay datos en caso de error
                });
            }
            req.user = decoded;  // Adjuntamo la información del cliente al objeto 'req'
            next();  // Llamamos al siguiente middleware o controlador
        });
    } else {
        // Si no se proporciona el token, respondemos con error
        return res.status(403).json({
            status: 'error',
            message: 'Forbidden: No token provided',
            data: null  // No hay datos en caso de error
        });
    }
};

module.exports = validateToken;
