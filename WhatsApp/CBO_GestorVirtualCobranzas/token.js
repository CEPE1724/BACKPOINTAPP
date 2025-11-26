// ./WhatsApp/CBO_GestorVirtualCobranzas/token.js
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../../.env')});
const jwt = require('jsonwebtoken');

const cliente = {
    clienteId: 1,
    nombre: 'whatsAppGestionesPoint$.$',
    correo: 'dpozo@point.com.ec',
    roles: ['usuario', 'whatsApp'],
};

const secretKey = process.env.FIXED_TOKEN_WHATSAPP;

if (!secretKey) {
    console.error('❌ Error: FIXED_TOKEN_WHATSAPP no está definida en .env');
    process.exit(1);
}

const token = jwt.sign(cliente, secretKey, { expiresIn: '365d' });

console.log('\n✅ Token JWT generado correctamente [WhatsApp]\n');
console.log('📋 Copia este token:\n');
console.log(token);
console.log('\n📝 Uso: Authorization: Bearer ' + token);
console.log('');
