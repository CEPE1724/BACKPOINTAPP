require('dotenv').config({ path: '../.env' }) // Cargar las variables de entorno

const jwt = require('jsonwebtoken')
// Información del cliente (esto podría venir de tu base de datos o de otro lugar)
const cliente = {
  clienteId: 4,
  nombre: 'LiaGestionesPoint$.$',
  correo: 'dpozo@point.com.ec',
  roles: ['usuario', 'Lia'] // Ejemplo de roles
}
// Leer la clave secreta desde las variables de entorno
const secretKey = process.env.FIXED_TOKEN_LIA // Cambié SECRET_KEY por FIXED_TOKEN_WHATSAPP

if (!secretKey) {
  console.error('Error: La clave secreta no está definida en el archivo .env')
  process.exit(1) // Detener la ejecución si no se encuentra la clave secreta
}

// Crear un token estático con la información del cliente
const token = jwt.sign(cliente, secretKey, { expiresIn: '365d' }) // El token durará 1 año

console.log('Token generado:', token)
