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
            // Devuelve un mensaje de error si el token es inválido o ha expirado
            return res.status(403).json({ message: 'Invalid token' });
        }
        // Obtener la fecha de expiración del token
        const currentTimestamp = Math.floor(Date.now() / 1000); // Fecha y hora actual en segundos
        const tokenExpirationTime = user.exp; // Expiración del token en segundos desde 1970

        // Verificar si el token ha expirado (por ejemplo, en un caso de 24 horas)
        if (currentTimestamp >= tokenExpirationTime) {
            return res.status(403).json({ message: 'Token has expired' });
        }

        // Adjuntar el usuario decodificado a la solicitud
        req.user = user;
        // Continuar con el siguiente middleware
        next();
    });
}

module.exports = authenticateToken;
