// controller.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { AppDataSource } = require("../config/database");
const UsuarioSchema = require("./model");
const UsuariosBodegas = require("../UsuariosBodegas/model");
const IngresoCobradorSchema = require("../IngresoCobrador/model");
const PermisosMenus = require("../PermisosMenus/model");
const JWT_SECRET = process.env.JWT_SECRET;

exports.getVaEmPass = async (req, res) => {
  const { nombre, clave } = req.body;

  try {
    const usuarioRepository = AppDataSource.getRepository(UsuarioSchema);
    const ingresoCobradorRepository = AppDataSource.getRepository(
      IngresoCobradorSchema
    );
    const UsuariosBodegasRepository = AppDataSource.getRepository(UsuariosBodegas);
    const PermisosMenusRepository = AppDataSource.getRepository(PermisosMenus);
    // Buscar al usuario por nombre y que esté activo
    const usuario = await usuarioRepository.findOne({
      where: { Nombre: nombre, Activo: 1, Clave: clave },
    });

    const IngresoCobrador = await ingresoCobradorRepository.findOne({
      where: { Codigo: nombre },
    });
    const ingresoCobradorData = IngresoCobrador || { nombre: "", cedula: "", idIngresoCobrador: 0 };
    const Apellidos = ingresoCobradorData.Nombre;
    const Cedula = ingresoCobradorData.Cedula;
    console.log(ingresoCobradorData);
    if (usuario) {
      const UsuariosBodegas = await UsuariosBodegasRepository.find({
        where: { idUsuario: usuario.idUsuario },
      });

      const PermisosMenus = await PermisosMenusRepository.find({
        where: { idRol: usuario.idGrupo },
      });
      const token = generateToken(usuario);
      return res.json({
        estado: "success",
        token,
        usuario: {
          idUsuario: usuario.idUsuario,
          Nombre: usuario.Nombre,
          idGrupo: usuario.idGrupo,
          Activo: usuario.Activo,
          ingresoCobrador: {
            nombre: ingresoCobradorData.Nombre ? ingresoCobradorData.Nombre : usuario.Nombre,
            cedula: ingresoCobradorData.Cedula ? ingresoCobradorData.Cedula : "",
            codigo: ingresoCobradorData.Codigo ? ingresoCobradorData.Codigo : usuario.Nombre,
            idIngresoCobrador: ingresoCobradorData.idIngresoCobrador ? ingresoCobradorData.idIngresoCobrador : usuario.idUsuario,
          },
          bodegas: UsuariosBodegas.map((ub) => ub.Bodega),
          permisosMenu: PermisosMenus.map((pm) => pm.idMenu),

        },
      });
    } else {
      res
        .status(200)
        .json({ estado: "fail", message: "Credenciales incorrectas" });
    }
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

async function comparePassword(providedPassword, storedPassword) {
  try {
    return await bcrypt.compare(providedPassword, storedPassword);
  } catch (error) {
    console.error("Error al comparar contraseñas:", error);
    return false;
  }
}

function generateToken(user) {
  try {
    return jwt.sign(
      {
        idUsuario: user.idUsuario,
        Nombre: user.Nombre,
        idGrupo: user.idGrupo,
        Activo: user.Activo,
      },
      JWT_SECRET,
      { expiresIn: "24h" } // Token expires in 24 hours
    );
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Token generation failed');
  }
}

