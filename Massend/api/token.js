// ./Massend/api/token.js
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../../.env')});
const jwt = require('jsonwebtoken');

const cliente = {
    clienteId: 4,
    nombre: 'IALiaPoint$.$_#',
    correo: 'dpozo@point.com.ec',
    roles: ['usuario', 'LiaIA'],
};

const secretKey = process.env.FIXED_TOKEN_LIA_MASSEND;

if (!secretKey) {
    console.error('❌ Error: FIXED_TOKEN_LIA_MASSEND no está definida en .env');
    process.exit(1);
}

const token = jwt.sign(cliente, secretKey, { expiresIn: '365d' });

console.log('\n✅ Token JWT generado correctamente [Massend]\n');
console.log('📋 Copia este token:\n');
console.log(token);
console.log('\n📝 Uso: Authorization: Bearer ' + token);
console.log('');
