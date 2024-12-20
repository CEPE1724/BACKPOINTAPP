// controller.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { AppDataSource } = require("../config/database");
const UsuarioSchema = require("./model");
const UsuariosBodegas = require("../UsuariosBodegas/model");
const IngresoCobradorSchema = require("../IngresoCobrador/model");
const PermisosMenus = require("../PermisosMenus/model");
const DispositivosAPP = require("../DispositivosAPP/model");
const Nomina = require("../Nomina/model");
const Com_AsignacionDeVendedores = require("../Com_AsignacionDeVendedores/model");
const Bodega = require("../Bodega/model");
const JWT_SECRET = process.env.JWT_SECRET;
const { LessThanOrEqual, MoreThanOrEqual } = require('typeorm');

const { Not } = require("typeorm");  // Importar el operador Not
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

exports.getVaEmPassUnikeV1 = async (req, res) => {
  const { nombre, clave, keyDispositivo, KeyBuild } = req.body;

  if (!nombre || !clave || !keyDispositivo || !KeyBuild) {
    return res.status(200).json({ estado: "fail", message: "Faltan datos" });
  }
  try {
    const usuarioRepository = AppDataSource.getRepository(UsuarioSchema);
    const ingresoCobradorRepository = AppDataSource.getRepository(
      IngresoCobradorSchema
    );
    const UsuariosBodegasRepository = AppDataSource.getRepository(UsuariosBodegas);
    const PermisosMenusRepository = AppDataSource.getRepository(PermisosMenus);
    const DispositivosAPPRepository = AppDataSource.getRepository(DispositivosAPP);
    const NominasRepository = AppDataSource.getRepository(Nomina);
    // Buscar al usuario por nombre y que esté activo
    const usuario = await usuarioRepository.findOne({
      where: { Nombre: nombre, Activo: 1, Clave: clave },
    });

    if (!usuario) {
      return res.status(200).json({ estado: "fail", message: "Credenciales incorrectas" });
    }
    console.log("keyDispositivo:", keyDispositivo);
    console.log("KeyBuild:", KeyBuild);

    let idNominaIdcobrador = 0;
    if (parseInt(KeyBuild, 10) === 1) {
      console.log("INGRESA NOMINA");
      const Nomina = await NominasRepository.findOne({ where: { Codigo: nombre } });

      if (!Nomina) {
        return res.status(200).json({ estado: "fail", message: "Registra tu cuenta en un nuevo dispositivo." });

      }
      idNominaIdcobrador = Nomina.idNomina;
    }

    if (parseInt(KeyBuild, 10) === 33) {
      console.log("INGRESA CREDI");
      const IngresoCobrador = await ingresoCobradorRepository.findOne({ where: { Codigo: nombre } });
    
      if (!IngresoCobrador) {
        return res.status(200).json({ estado: "fail", message: "Registra tu cuenta en un nuevo dispositivo." });
      }
      idNominaIdcobrador = IngresoCobrador.idIngresoCobrador;

      console.log("IngresoCobrador:", IngresoCobrador);

    }

    const dispositivo = await DispositivosAPPRepository.findOne({
      where: { KeyDispositivo: keyDispositivo, idNomina: idNominaIdcobrador },
    });

    if (!dispositivo) {
      return res.status(200).json({ estado: "fail", message: "Registra tu cuenta en un nuevo dispositivo." });
    }
    const IngresoCobrador = await ingresoCobradorRepository.findOne({
      where: { Codigo: nombre },
    });
    const ingresoCobradorData = IngresoCobrador || { nombre: "", cedula: "", idIngresoCobrador: 0 };
    const Apellidos = ingresoCobradorData.Nombre;
    const Cedula = ingresoCobradorData.Cedula;

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

exports.getVaEmPassV1 = async (req, res) => {
  const { KeyPinPass, KeyDispositivo } = req.body;
  console.log("KeyPinPass:", KeyPinPass);
  try {
    const usuarioRepository = AppDataSource.getRepository(UsuarioSchema);
    const DispositivosAPPRepository = AppDataSource.getRepository(DispositivosAPP);
    const NominaRepository = AppDataSource.getRepository(Nomina);
    const UsuariosBodegasRepository = AppDataSource.getRepository(UsuariosBodegas);
    const PermisosMenusRepository = AppDataSource.getRepository(PermisosMenus);
    const ingresoCobradorRepository = AppDataSource.getRepository(IngresoCobradorSchema);
    const BodegaRepository = AppDataSource.getRepository(Bodega);
    const Com_AsignacionDeVendedoresRepository = AppDataSource.getRepository(Com_AsignacionDeVendedores);

    // Función para obtener el dispositivo
    const getDispositivo = async () => {
      return await DispositivosAPPRepository.findOne({
        where: { PinSeguridad: KeyPinPass, KeyDispositivo: KeyDispositivo, idCom_Estado: Not(2) },
      });
    };

    // Función para obtener el usuario por código y estado activo
    const getUsuarioByCodigo = async (codigo) => {
      return await usuarioRepository.findOne({ where: { Nombre: codigo, Activo: 1 } });
    };

    // Función para obtener los permisos del usuario
    const getPermisosMenus = async (idGrupo) => {
      return await PermisosMenusRepository.find({ where: { idRol: idGrupo } });
    };

    // Función para generar el token
    const generateUserToken = (usuario) => {
      return generateToken(usuario);
    };

    // Función para obtener los datos del cobrador
    const getIngresoCobradorData = async (idNomina, Empresa, idTipoPersonal) => {
      let ingresoCobradorData = { nombre: "", cedula: "", idIngresoCobrador: 0, Codigo: "" };

      if (parseInt(idTipoPersonal, 10) === 1) { // Administrativo
        let Nomina;
        if (parseInt(Empresa, 10) === 1) {
          Nomina = await NominaRepository.findOne({ where: { idNomina } });
          ingresoCobradorData = {
            nombre: `${Nomina.PrimerNombre} ${Nomina.SegundoNombre} ${Nomina.ApellidoPaterno} ${Nomina.ApellidoMaterno}`,
            cedula: Nomina.NIdentificacion,
            idIngresoCobrador: idNomina,
            Codigo: Nomina.Codigo,
          };
        } else if (parseInt(Empresa, 10) === 33) { // Terrena
          Nomina = await ingresoCobradorRepository.findOne({ where: { idIngresoCobrador: idNomina } });
          ingresoCobradorData = {
            nombre: Nomina.Nombre,
            cedula: Nomina.Cedula,
            idIngresoCobrador: idNomina,
            Codigo: Nomina.Codigo,
          };
        }
      }

      return ingresoCobradorData;
    };

    // Función para verificar la asignación de vendedores
    const checkAsignacionDeVendedores = async (idPersonal) => {
      return await Com_AsignacionDeVendedoresRepository.findOne({
        where: {
          idPersonal,
          Desde: LessThanOrEqual(new Date()),
          Hasta: MoreThanOrEqual(new Date()),
        },
      });
    };

    // Función para obtener los datos de la bodega
    const getBodegaData = async (Bodega) => {
      return await BodegaRepository.findOne({ where: { Bodega } });
    };

    const dispositivo = await getDispositivo();

    if (!dispositivo) {
      return res.status(200).json({ estado: "fail", message: "Credenciales incorrectas" });
    }

    const { idNomina, idCom_Estado, Empresa, idTipoPersonal } = dispositivo;

    let sNombre = '';
    let sCodigo = '';
    let ingresoCobradorData = { nombre: "", cedula: "", idIngresoCobrador: 0, Codigo: "" };

    // Si es administrativo
    if (parseInt(idTipoPersonal, 10) === 1) {
      ingresoCobradorData = await getIngresoCobradorData(idNomina, Empresa, idTipoPersonal);
      sCodigo = ingresoCobradorData.Codigo;
      sNombre = ingresoCobradorData.nombre;

      const usuario = await getUsuarioByCodigo(sCodigo);

      if (!usuario) {
        return res.status(200).json({ estado: "fail", message: "Usuario no autorizado comuniquese con R.R.H.H/Desarrollo.2" });
      }

      const UsuariosBodegas = await UsuariosBodegasRepository.find({ where: { idUsuario: usuario.idUsuario } });
      const PermisosMenus = await getPermisosMenus(usuario.idGrupo);

      const token = generateUserToken(usuario);
      return res.json({
        estado: "success",
        token,
        usuario: {
          idUsuario: usuario.idUsuario,
          Nombre: usuario.Nombre,
          idGrupo: usuario.idGrupo,
          Activo: usuario.Activo,
          iTipoPersonal: idTipoPersonal,
          ingresoCobrador: ingresoCobradorData,
          bodegas: UsuariosBodegas.map((ub) => ub.Bodega),
          permisosMenu: PermisosMenus.map((pm) => pm.idMenu),
        },
      });
    }

    // Si es vendedor
    if (parseInt(idTipoPersonal, 10) === 2) {
      const Nomina = await NominaRepository.findOne({ where: { idNomina } });
      const idPersonal = Nomina.idPersonal;

      const AsignacionDeVendedores = await checkAsignacionDeVendedores(idPersonal);

      if (!AsignacionDeVendedores) {
        return res.status(200).json({ estado: "fail", message: "Usuario no autorizado comuniquese con R.R.H.H/Desarrollo.3" });
      }

      if (AsignacionDeVendedores.length > 1) {
        return res.status(200).json({ estado: "fail", message: "Usuario tiene múltiples asignaciones, comuniquese con R.R.H.H/Desarrollo.4" });
      }

      const Bodega = AsignacionDeVendedores.Bodega;
      const CdoigoBodega = await getBodegaData(Bodega);

      if (!CdoigoBodega) {
        return res.status(200).json({ estado: "fail", message: "Usuario no autorizado comuniquese con R.R.H.H/Desarrollo.5" });
      }

      const CodigoBodega = `${CdoigoBodega.Codigo}CAJA`;
      const usuario = await getUsuarioByCodigo(CodigoBodega);
      console.log("usuario:", usuario);
      console.log("CodigoBodega:", CodigoBodega);
      if (!usuario) {
        return res.status(200).json({ estado: "fail", message: "Usuario no autorizado" });
      }

      const IngresoCobrador = await ingresoCobradorRepository.findOne({ where: { Codigo: CodigoBodega } });
      const ingresoCobradorData = IngresoCobrador || { nombre: "", cedula: "", idIngresoCobrador: 0 };

      const UsuariosBodegas = await UsuariosBodegasRepository.find({ where: { idUsuario: usuario.idUsuario } });
      const PermisosMenus = await getPermisosMenus(usuario.idGrupo);

      const token = generateUserToken(usuario);
      return res.json({
        estado: "success",
        token,
        usuario: {
          idUsuario: usuario.idUsuario,
          Nombre: usuario.Nombre,
          idGrupo: usuario.idGrupo,
          Activo: usuario.Activo,
          iTipoPersonal: idTipoPersonal,
          ingresoCobrador: ingresoCobradorData,
          bodegas: UsuariosBodegas.map((ub) => ub.Bodega),
          permisosMenu: PermisosMenus.map((pm) => pm.idMenu),
        },
      });
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
      { expiresIn: "10m" } // Token expires in 24 hours
    );
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Token generation failed');
  }
}

