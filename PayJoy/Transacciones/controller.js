const { AppDataSource } = require("../../ApiCobrador/api/config/database");
const { In } = require('typeorm');
const Transaccion_PayJoy_Api_Rest = require("./model");
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

/**
 * POST - Recibir transacciones desde PayJoy
 */
exports.postTransacciones = async (req, res) => {
  try {
    // 1️⃣ Verificar API Key de PayJoy
    if (!verifyPayjoyApiKey(req)) {
      return res.status(401).json({
        ok: false,
        message: "API Key inválida. La solicitud no está autorizada."
      });
    }

    console.log("✅ API Key verificada correctamente");

    const transactionData = req.body;

    // 2️⃣ Validar que llegaron transacciones
    if (!transactionData.transactions || !Array.isArray(transactionData.transactions)) {
      return res.status(400).json({
        ok: false,
        message: "No se recibieron transacciones válidas"
      });
    }

    const transactions = transactionData.transactions;
    const savedTransactions = [];
    const errors = [];

    // 3️⃣ Procesar cada transacción
    for (const tx of transactions) {
      try {
        // Crear objeto de registro
        const registro = {
          pago: tx.amount || 0,
          moneda: tx.currency || 'USD',
          tiempo: tx.time.toString() || '',
          type: tx.type || '',
          estado: 0,
          FechaSistema: new Date(),
          
          // Cliente (si existe)
          idCliente: tx.customer?.id || 0,
          nombreClientes: tx.customer?.name || '',
          telefonoCliente: tx.customer?.phoneNumber || '',
          
          // Dispositivo (si existe)
          imeiDispositivo: tx.device?.imei || '',
          telefonoDispositivo: tx.device?.phoneNumber || '',
          simNumeroDispositivo: tx.device?.simNumber || '',
          
          // Familia del dispositivo
          idFamilia: tx.device?.family?.id || 0,
          nombreFamilia: tx.device?.family?.name || '',
          
          // Modelo del dispositivo
          idModelo: tx.device?.model?.id || 0,
          modelo: tx.device?.model?.makeModel || '',
          nombreModelo: tx.device?.model?.name || '',
          
          // Orden de financiamiento (si existe)
          idOrdenFinanza: tx.financeOrder?.id || 0,
          pagoInicial: tx.financeOrder?.downPayment || 0,
          montoFinanciero: tx.financeOrder?.financeAmount || 0,
          costoMensual: tx.financeOrder?.monthlyCost || 0,
          meses: tx.financeOrder?.months || 0,
          precioAntesImpuesto: tx.financeOrder?.pricePreTax || 0,
          montoCompra: tx.financeOrder?.purchaseAmount || 0,
          costoSemanal: tx.financeOrder?.weeklyCost || 0,
          
          // Vendedor (si existe)
          idVendedor: tx.merchant?.id || 0,
          nombreVendedor: tx.merchant?.name || '',
          
          // Empleado de ventas (si existe)
          idEmpleadoVentas: tx.salesClerk?.id || 0,
          nombreEmpleadoVentas: tx.salesClerk?.name || '',
          uuid: tx.salesClerk?.uuid || ''
        };

        // Guardar el registro en la base de datos
        const nuevoRegistro = await AppDataSource.getRepository(Transaccion_PayJoy_Api_Rest).save(registro);
        
        savedTransactions.push({
          id: nuevoRegistro.idtransaccion,
          type: tx.type,
          amount: tx.amount,
          time: tx.time
        });

      } catch (error) {
        console.error("❌ Error al guardar transacción:", error);
        errors.push({
          type: tx.type,
          error: error.message
        });
      }
    }

    // 4️⃣ Retornar respuesta
    console.log(`✅ Guardadas ${savedTransactions.length} transacciones`);
    
    return res.status(201).json({
      ok: true,
      message: "Transacciones procesadas correctamente",
      saved: savedTransactions.length,
      errors: errors.length,
      details: {
        savedTransactions,
        errors
      }
    });

  } catch (error) {
    console.error("❌ Error en postTransacciones:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al procesar transacciones",
      error: error.message
    });
  }
};

