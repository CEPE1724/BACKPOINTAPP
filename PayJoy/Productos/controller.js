const { AppDataSource } = require("../../ApiCobrador/api/config/database");
const crypto = require("crypto");

require("dotenv").config();

const PAYJOY_SECRET = process.env.PAYJOY_SECRET;



if (!PAYJOY_SECRET) {
  console.warn("⚠️  ADVERTENCIA: PAYJOY_SECRET no está configurada en .env");
}


function verifyPayjoySignature(req) {
  try {
    const receivedSignature = req.get("X-PayJoy-Signature");
    
    if (!receivedSignature) {
      console.log("❌ Falta firma X-PayJoy-Signature");
      return false;
    }

    // Para GET sin body, usamos string vacío
    const bodyToSign = req.rawBody || Buffer.from('');

    const expectedSignature = crypto
      .createHmac("sha256", PAYJOY_SECRET)
      .update(bodyToSign)
      .digest("base64");

    const bufferExpected = Buffer.from(expectedSignature);
    const bufferReceived = Buffer.from(receivedSignature);

    if (bufferExpected.length !== bufferReceived.length) {
      console.log("❌ Longitud de firmas no coincide");
      return false;
    }

    const isValid = crypto.timingSafeEqual(bufferExpected, bufferReceived);
    
    if (!isValid) {
      console.log("❌ Firma inválida");
      console.log("Esperada:", expectedSignature);
      console.log("Recibida:", receivedSignature);
    }

    return isValid;
  } catch (error) {
    console.error("❌ Error al verificar firma PayJoy:", error.message);
    return false;
  }
}


const getProductos = async (req, res) => {
  try {
    // 1️⃣ Verificar firma de PayJoy
    if (!verifyPayjoySignature(req)) {
      return res.status(401).json({
        ok: false,
        message: "Firma inválida. La solicitud no proviene de PayJoy."
      });
    }

    console.log("✅ Firma verificada correctamente");

    // 2️⃣ Ejecutar procedimiento almacenado
    const result = await AppDataSource.query(
      `EXEC ListaArticulosPayJoy`
    );

    // 3️⃣ Formatear datos (6 campos)
    const productos = result.map(item => ({
      preTaxPrice: parseFloat(item.preTaxPrice) || 0,
      taxPrice: parseFloat(item.taxPrice) || 0,
      fullPrice: parseFloat(item.fullPrice) || 0,
      model: item.model || '',
      manufacturer: item.manufacturer || '',
      description: item.description || ''
    }));

    console.log(`✅ Se obtuvieron ${productos.length} productos`);

    // 4️⃣ Retornar array directo
    return res.status(200).json(productos);

  } catch (err) {
    console.error("❌ Error al ejecutar el procedimiento almacenado:", err);
    return res.status(500).json({
      ok: false,
      message: "Error al obtener productos",
      error: err.message
    });
  }
};

module.exports = {
  getProductos,
  verifyPayjoySignature
};
