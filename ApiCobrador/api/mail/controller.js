const { EmailService } = require('./service'); // Importa la clase desde el módulo
const emailService = new EmailService();       // Instancia la clase

exports.enviarNotificacion = async (req, res) => {
  const { to, Mensaje } = req.body;

  try {
    await emailService.enviarNotificacionGeneralV2({ to, Mensaje });
    res.status(200).json({ message: 'Correo enviado correctamente.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
