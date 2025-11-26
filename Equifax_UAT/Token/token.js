// ./Equifax_UAT/Token/token.js
// Script para generar un token JWT válido para la API de Equifax UAT

const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../../.env')});
const jwt = require('jsonwebtoken');

// Información del cliente
const cliente = {
    clienteId: 2,
    nombre: 'Equifax_Uat_Credito_Point$.$',
    correo: 'cjara@credisolucion.com.ec',
    roles: ['usuario', 'Equifax_Uat'],
};

// Leer la clave secreta desde las variables de entorno
const secretKey = process.env.FIXED_TOKEN_EQUIFAX_UAT;

if (!secretKey) {
    console.error('❌ Error: La clave secreta FIXED_TOKEN_EQUIFAX_UAT no está definida en el archivo .env');
    process.exit(1);
}

// Crear un token con la información del cliente
const token = jwt.sign(cliente, secretKey, { expiresIn: '365d' });

console.log('\n✅ Token JWT generado correctamente\n');
console.log('📋 Copia este token para usar en tus peticiones:\n');
console.log(token);
console.log('\n📝 Ejemplo de uso en Postman/Thunder Client:');
console.log('Header: Authorization');
console.log('Value: Bearer ' + token);
console.log('');
