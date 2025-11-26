// ./Equifax_UAT/Token/auth.js
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const jwt = require('jsonwebtoken');

const secretKey = process.env.FIXED_TOKEN_EQUIFAX_UAT;
  
// Validar que la clave secreta esté configurada
if (!secretKey) {
    console.error('❌ ERROR: FIXED_TOKEN_EQUIFAX_UAT no está definida en .env');
} else {
    console.log('✅ Secret key cargada correctamente');
}

// Middleware para validar el token
const validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    console.log('🔍 Validando token...');
    console.log('Authorization header:', authHeader ? 'Presente' : 'Ausente');

    if (!authHeader) {
        console.log('❌ No se proporcionó token');
        return res.status(403).json({
            status: 'error',
            message: 'Forbidden: No token provided',
            data: null
        });
    }

    // Soportar tanto 'Bearer token' como solo 'token'
    const token = authHeader.startsWith('Bearer ') 
        ? authHeader.split(' ')[1] 
        : authHeader;

    if (!token) {
        console.log('❌ Token vacío después de extraer');
        return res.status(403).json({
            status: 'error',
            message: 'Forbidden: Invalid token format',
            data: null
        });
    }

    // Verificamos el token con la clave secreta
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log('❌ Token inválido:', err.message);
            return res.status(403).json({
                status: 'error',
                message: 'Forbidden: Invalid token',
                data: null,
                error: process.env.NODE_ENV === 'development' ? err.message : undefined
            });
        }
        
        console.log('✅ Token válido para:', decoded.nombre);
        req.user = decoded;
        next();
    });
};

module.exports = validateToken;
