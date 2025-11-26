# Autenticación API Equifax UAT

## 🔐 Token de Autenticación

Esta API requiere un token JWT válido para acceder a los endpoints protegidos.

### ✅ Token Generado

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRlSWQiOjIsIm5vbWJyZSI6IkVxdWlmYXhfVWF0X0NyZWRpdG9fUG9pbnQkLiQiLCJjb3JyZW8iOiJjamFyYUBjcmVkaXNvbHVjaW9uLmNvbS5lYyIsInJvbGVzIjpbInVzdWFyaW8iLCJFcXVpZmF4X1VhdCJdLCJpYXQiOjE3NjQxNzg5NzUsImV4cCI6MTc5NTcxNDk3NX0.xdyrMMKNoOwug3qq64SrlS9ijnqIuhdaWu_WUTmm_3E
```

**Válido hasta:** 26 de noviembre de 2026

---

## 📝 Cómo usar el token

### En Postman / Thunder Client

1. **Headers:**
   - Key: `Authorization`
   - Value: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRlSWQiOjIsIm5vbWJyZSI6IkVxdWlmYXhfVWF0X0NyZWRpdG9fUG9pbnQkLiQiLCJjb3JyZW8iOiJjamFyYUBjcmVkaXNvbHVjaW9uLmNvbS5lYyIsInJvbGVzIjpbInVzdWFyaW8iLCJFcXVpZmF4X1VhdCJdLCJpYXQiOjE3NjQxNzg5NzUsImV4cCI6MTc5NTcxNDk3NX0.xdyrMMKNoOwug3qq64SrlS9ijnqIuhdaWu_WUTmm_3E`

2. **Body (JSON):**
```json
{
  "tipoDocumento": "C",
  "numeroDocumento": "1234567890"
}
```

### En cURL

```bash
curl -X POST http://localhost:3055/equifax_uat/oauth \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRlSWQiOjIsIm5vbWJyZSI6IkVxdWlmYXhfVWF0X0NyZWRpdG9fUG9pbnQkLiQiLCJjb3JyZW8iOiJjamFyYUBjcmVkaXNvbHVjaW9uLmNvbS5lYyIsInJvbGVzIjpbInVzdWFyaW8iLCJFcXVpZmF4X1VhdCJdLCJpYXQiOjE3NjQxNzg5NzUsImV4cCI6MTc5NTcxNDk3NX0.xdyrMMKNoOwug3qq64SrlS9ijnqIuhdaWu_WUTmm_3E" \
  -d '{
    "tipoDocumento": "C",
    "numeroDocumento": "1234567890"
  }'
```

### En JavaScript/Node.js

```javascript
const axios = require('axios');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRlSWQiOjIsIm5vbWJyZSI6IkVxdWlmYXhfVWF0X0NyZWRpdG9fUG9pbnQkLiQiLCJjb3JyZW8iOiJjamFyYUBjcmVkaXNvbHVjaW9uLmNvbS5lYyIsInJvbGVzIjpbInVzdWFyaW8iLCJFcXVpZmF4X1VhdCJdLCJpYXQiOjE3NjQxNzg5NzUsImV4cCI6MTc5NTcxNDk3NX0.xdyrMMKNoOwug3qq64SrlS9ijnqIuhdaWu_WUTmm_3E';

axios.post('http://localhost:3055/equifax_uat/oauth', {
  tipoDocumento: 'C',
  numeroDocumento: '1234567890'
}, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
.then(response => console.log(response.data))
.catch(error => console.error(error.response.data));
```

---

## 🔄 Generar un nuevo token

Si necesitas generar un nuevo token, ejecuta:

```bash
cd Equifax_UAT/Token
node token.js
```

---

## ⚠️ Errores comunes

### Error: "Forbidden: No token provided"
- **Causa:** No se envió el header `Authorization`
- **Solución:** Asegúrate de incluir el header con el token

### Error: "Forbidden: Invalid token"
- **Causa:** El token es inválido o está mal formado
- **Solución:** 
  1. Verifica que estés usando el token completo
  2. Asegúrate de incluir `Bearer ` antes del token
  3. Genera un nuevo token con `node token.js`

### Error: "Forbidden: Invalid token format"
- **Causa:** El formato del header Authorization no es correcto
- **Solución:** El formato debe ser: `Authorization: Bearer <token>`

---

## 📋 Información del token

- **Cliente ID:** 2
- **Nombre:** Equifax_Uat_Credito_Point$.$
- **Email:** cjara@credisolucion.com.ec
- **Roles:** usuario, Equifax_Uat
- **Expiración:** 365 días desde la generación

---

## 🛡️ Seguridad

- El token se genera usando la clave secreta `FIXED_TOKEN_EQUIFAX_UAT` del archivo `.env`
- **NUNCA** compartas la clave secreta del `.env`
- El token generado es seguro para uso en desarrollo y producción
- Si el token se compromete, genera uno nuevo
