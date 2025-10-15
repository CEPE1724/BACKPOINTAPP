const { AppDataSource } = require("../config/database");
const ExpoNotificacionesComisiones = require("./model");
const { EmailService } = require('../mail/service'); // Asegúrate que './service.js' exporta la clase correctamente
const emailService = new EmailService();   
const axios = require('axios');

exports.pushComisiones = async (req, res) => {
  try {
    const comisiones = await AppDataSource.getRepository(ExpoNotificacionesComisiones).find(
        {
            where: {
                Enviado: false,
                FechaEnvioNotificacion: null
            },
            order: {
                FechaCreacion: 'ASC' // Ordenar por fecha de creación ascendente
            }
        }
    );

    if (!comisiones || comisiones.length === 0) {
      return res.status(404).json({ message: "No se encontraron comisiones" });
    }

    for (const comision of comisiones) {
      const { TokenExpo, Alert, Titulo, Mensaje, idExpoNotificacionesComisiones, empresa,
        bApp, bSms, bEmail, Emial, Telefono
       } = comision;

      // Validar token Expo
      if (TokenExpo && bApp && TokenExpo.startsWith('ExponentPushToken')) {
        const payload = {
          tokens: [TokenExpo],
          notification: {
            type: Alert,
            title: Titulo,
            body: Mensaje,
            url: "",
            empresa: empresa || "POINT", // Asegurarse de que empresa no sea undefined
          }
        };
        try {
          await axios.post('https://appservices.com.ec/cobranza/api/v1/point/NotificationUser/expo', payload);
          // Actualizar la comisión como enviada
          comision.FechaEnvioNotificacion = new Date();
          comision.Enviado = true;
            await AppDataSource.getRepository(ExpoNotificacionesComisiones).save(comision);
       

        } catch (error) {
          console.error(`❌ Error al enviar notificación a ${TokenExpo}:`, error.message || error);
        }
      }

      // enicar correo electrónico si bEmail es true
      if (bEmail && Emial) {
        const emailPayload = {
          to: Emial,
          Mensaje: Mensaje,
        };

        try {
          await emailService.enviarNotificacionGeneralV2(emailPayload);
          // Actualizar la comisión como enviada
          comision.FechaEnvioNotificacion = new Date();
          comision.Enviado = true;
          await AppDataSource.getRepository(ExpoNotificacionesComisiones).save(comision);
          console.log(`📧 Correo enviado a ${Emial}`);
        } catch (error) {
          console.error(`❌ Error al enviar correo a ${Emial}:`, error.message || error);
        }
      }
    }

    res.status(200).json({ message: "✅ Notificaciones enviadas correctamente" });

  } catch (error) {
    console.error("💥 Error general al enviar las notificaciones:", error.message || error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
