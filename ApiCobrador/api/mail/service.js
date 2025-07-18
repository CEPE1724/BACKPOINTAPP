const nodemailer = require('nodemailer');
require('dotenv').config();

class EmailService {
  getRandomEmailNumber() {
    return Math.floor(Math.random() * 5) + 1;
  }

  createTransporter(emailNumber) {
    const user = process.env[`MAIL_USERNAME_${emailNumber}`];
    const pass = process.env.MAIL_PASSWORD;

    return nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: process.env.MAIL_ENCRYPTION === 'ssl' || Number(process.env.MAIL_PORT) === 465,
      auth: { user, pass },
      tls: { rejectUnauthorized: false },
      connectionTimeout: 30000,
      socketTimeout: 30000,
    });
  }

  async enviarNotificacionGeneralV2(params) {
    const emailNumber = this.getRandomEmailNumber();
    const transporter = this.createTransporter(emailNumber);
    const fromEmail = process.env[`MAIL_USERNAME_${emailNumber}`];
    const ahora = new Date();

    try {
      await transporter.sendMail({
        from: `"${process.env.MAIL_FROM_NAME}" <${fromEmail}>`,
        to: params.to,
        subject: '🔔 Notificación del sistema',
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>Alerta</h2>
            <p>${params.Mensaje}</p>
            <p style="font-size: 12px; color: gray;">${ahora.toLocaleString()}</p>
          </div>
        `,
      });

      console.log('📨 Correo enviado correctamente.');
    } catch (error) {
      console.error('❌ Error al enviar correo:', error.message);
      throw new Error('No se pudo enviar el correo');
    }
  }
}

module.exports = { EmailService };
