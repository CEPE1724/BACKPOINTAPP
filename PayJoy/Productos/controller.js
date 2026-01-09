const { AppDataSource } = require("../../ApiCobrador/api/config/database");
require("dotenv").config();

const PAYJOY_API_KEY = process.env.PAYJOY_API_KEY;

if (!PAYJOY_API_KEY) {
  console.warn("⚠️  ADVERTENCIA: PAYJOY_API_KEY no está configurada en .env");
}

/**
 * Verificar API Key de PayJoy
 */
function verifyPayjoyApiKey(req) {
  try {
    const apiKey = req.get("X-PayJoy-Signature");
    
    if (!apiKey) {
      console.log("❌ Falta header X-PayJoy-Signature");
      return false;
    }

    if (apiKey !== PAYJOY_API_KEY) {
      console.log("❌ API Key inválida");
      return false;
    }

    return true;
  } catch (error) {
    console.error("❌ Error al verificar API Key:", error.message);
    return false;
  }
}


const getProductos = async (req, res) => {
  try {
    // 1️⃣ Verificar API Key de PayJoy
    if (!verifyPayjoyApiKey(req)) {
      return res.status(401).json({
        ok: false,
        message: "API Key inválida. La solicitud no está autorizada."
      });
    }


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
  verifyPayjoyApiKey
};
