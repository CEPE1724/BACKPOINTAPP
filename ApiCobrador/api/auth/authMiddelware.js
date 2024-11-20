const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
    // Obtener el encabezado de autorización
    const authHeader = req.headers['authorization'];
    // Verificar y extraer el token
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (token == null) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Verificar el token
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            // Devuelve un mensaje de error más específico si es posible
            return res.status(403).json({ message: 'Invalid token' });
        }
        // Adjuntar el usuario decodificado a la solicitud
        req.user = user;
        // Continuar con el siguiente middleware
        next();
    });
}

module.exports = authenticateToken;
