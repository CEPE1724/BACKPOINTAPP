const axios = require('axios');

/**
 * Ejecuta la orquestación de Equifax
 */
async function executeEquifaxOrchestration(token, tipoDocumento, numeroDocumento) {
    try {
        const payload = {
            applicants: {
                primaryConsumer: {
                    personalInformation: {
                        tipoDocumento,
                        numeroDocumento
                    }
                }
            },
            productData: {
                billTo: "EC005006B001",
                shipTo: "EC005006B001S001",
                productName: "ECICESPECIALIZADODECIDA",
                productOrch: "ICESPECIALIZADODECIDA",
                configuration: "Interconnect",
                customer: "ECICCOMPUBUSSINES",
                model: "DECIDABUSSINES"
            }
        };

        const response = await axios.post(
            'https://api.latam.equifax.com/business/interconnect/v1/decision-orchestrations/execute',
            JSON.stringify(payload),
            {
                headers: {
                    'Content-Type': 'application/vnd.com.equifax.clientconfig.v1+json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
  
        return response.data;

    } catch (error) {
        console.error("Error en ejecución de orquestación:", error?.response?.data || error.message);
        return {
            status: 'error',
            message: 'Error al ejecutar la orquestación de Equifax',
            data: null
        };
    }
}

module.exports = { executeEquifaxOrchestration };
