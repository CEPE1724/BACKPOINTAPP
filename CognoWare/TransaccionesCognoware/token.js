// ./CognoWare/TransaccionesCognoware/token.js
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../../.env')});
const jwt = require('jsonwebtoken');

const cliente = {
    clienteId: 2,
    nombre: 'Cognoware_Credito_Point$.$',
    correo: 'cjara@credisolucion.com.ec',
    roles: ['usuario', 'Cognoware'],
};

const secretKey = process.env.FIXED_TOKEN_COGNOWARE;

if (!secretKey) {
    console.error('❌ Error: FIXED_TOKEN_COGNOWARE no está definida en .env');
    process.exit(1);
}

const token = jwt.sign(cliente, secretKey, { expiresIn: '365d' });

console.log('\n✅ Token JWT generado correctamente [CognoWare]\n');
console.log('📋 Copia este token:\n');
console.log(token);
console.log('\n📝 Uso: Authorization: Bearer ' + token);
console.log('');
