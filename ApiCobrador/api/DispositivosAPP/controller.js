const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { AppDataSource } = require("../config/database");
const DispositivosAPPSchema = require("./model");
const JWT_SECRET = process.env.JWT_SECRET;
const { Not } = require("typeorm");  // Importar el operador Not

exports.alllist = async (req, res) => {
  const { Cedula } = req.query; // Suponemos que la cédula viene en el cuerpo de la solicitud
  console.log("Cedula:", Cedula);
  try {
    // Obtener el repositorio de la tabla de DispositivosAPP
    const usuarioRepository = AppDataSource.getRepository(DispositivosAPPSchema);

    // Buscar al usuario por cédula y que esté activo (condición adicional: no puede tener estado 2)
    const usuario = await usuarioRepository.findOne({
      where: { Cedula: Cedula, Activo: 0, idCom_Estado: Not(2) },
    });
    console.log("edison:", usuario);

    // Verificar si el usuario existe
    if (usuario) {
      // Si el usuario existe, generamos el token JWT con los datos mínimos necesarios
      const token = jwt.sign(
        {
          idNomina: usuario.idNomina,
          idCom_Estado: usuario.idCom_Estado,
          Empresa: usuario.Empresa,
          Activo: usuario.Activo,
          Cedula: usuario.Cedula,
          KeyDispositivo: usuario.KeyDispositivo,
          iTipoPersonal: usuario.idTipoPersonal
        },
        JWT_SECRET,
        { expiresIn: "1h" }  // El token expirará en 1 hora
      );

      return res.json({
        estado: "success",
        token,
        idNomina: usuario.idNomina,
        idCom_Estado: usuario.idCom_Estado,
        Empresa: usuario.Empresa,
        Activo: usuario.Activo,
        Cedula: usuario.Cedula,
        KeyDispositivo: usuario.KeyDispositivo,
        iTipoPersonal: usuario.idTipoPersonal
      });

    } else {
      // Si no se encuentra al usuario
      res.status(200).json({ estado: "fail", message: "Usuario no autorizado comuquise con R.R.H.H/Desarrollo" });
    }
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


exports.UpdateEstado = async (req, res) => {
  const { Cedula, KeyDispositivo, Pin } = req.body; // Suponemos que la cédula y la clave del dispositivo vienen en el cuerpo de la solicitud
  console.log("Cedula:", Cedula);
  console.log("KeyDispositivo:", KeyDispositivo);
  if (!Cedula || !KeyDispositivo || !Pin) {
    return res.status(400).json({
      estado: "fail",
      message: "Los parámetros 'Cedula' y 'KeyDispositivo' son obligatorios."
    });
  }
  try {
    // Obtener el repositorio de la tabla de DispositivosAPP
    const usuarioRepository = AppDataSource.getRepository(DispositivosAPPSchema);

    // Buscar al usuario por cédula y clave del dispositivo
    const usuario = await usuarioRepository.findOne({
      where: { Cedula: Cedula, KeyDispositivo: KeyDispositivo },
    });

    // Verificar si el usuario existe
    if (usuario) {
      // Actualizar el estado del usuario a activo
      usuario.Activo = 1;
      usuario.Pin = Pin;
      await usuarioRepository.save(usuario);

      return res.json({
        estado: "success",
        message: "Usuario actualizado correctamente",
        Cedula: usuario.Cedula
      });

    } else {
      // Si no se encuentra al usuario
      res.status(200).json({ estado: "fail", message: "Usuario no autorizado comuniquese con R.R.H.H/Desarrollo" });
    }
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}