const sql = require('mssql');
require('dotenv').config();

const baseConfig = {
  user: process.env.DB_USER_GRETA,
  password: process.env.DB_PASSWORD_GRETA,
  server: process.env.DB_SERVER_GRETA,
  options: {
    encrypt: false,
    trustServerCertificate: false,
  }
};

function getConfig(database) {
  return {
    ...baseConfig,
    database: database || process.env.DB_DATABASE_GRETA,
  };
}


async function ValUser(user, password) {
  const config = getConfig();
    try {
        // Conectar a la base de datos
        const pool = await sql.connect(config);
    
        // Verificar si la conexión fue exitosa
        if (pool.connected) {
            console.log('Conexión exitosa a la base de datos val usuario.');
        } else {
            console.log('La conexión a la base de datos no fue exitosa.');
        }
    
        const result = await pool.request()
        .input('user', sql.VarChar(120), user)
        .input('pass', sql.VarChar(100), password)
        .input('tipo', sql.Int, 1)
        .execute('APPValUser');
        // Cerrar la conexión
        await sql.close();
    
        // Capturar el resultado y enviarlo en un objeto
        const datos = result.recordset;
    
        return { datos };
        }
    catch (error) {
        console.error('Error al obtener datos de la base de datos:', error);
        throw error;
    }
}


async function obtenerDatos() {
  const config = getConfig();
  try {
    // Conectar a la base de datos
    const pool = await sql.connect(config);

    // Verificar si la conexión fue exitosa
    if (pool.connected) {
      console.log('Conexión exitosa a la base de datos.');
    } else {
      console.log('La conexión a la base de datos no fue exitosa.');
    }
   const currentDate = new Date();
   const year = currentDate.getFullYear();
   const month = String(currentDate.getMonth() + 1).padStart(2, '0');
   const day = String(currentDate.getDate()).padStart(2, '0');
   const formattedDate = `${year}${month}${day}`;
   console.log(formattedDate);

      console.log('Fecha actual comisiones:', formattedDate);

    const result = await pool.request()
      .input('Desde', sql.VarChar(8), formattedDate)
      .input('Hasta', sql.VarChar(8), formattedDate)
      .execute('ReporteDeVentasPorLocalEmail');

    // Cerrar la conexión
    await sql.close();

    // Capturar el resultado y enviarlo en un objeto
    const datos = result.recordset;
   console.log(datos);
    return { datos };
  } catch (error) {
    console.error('Error al obtener datos de la base de datos:', error);
    throw error;
  }
}

async function getListEmpresa(idUsuario) {
  const config = getConfig();
  try {
    // Conectar a la base de datos
    const pool = await sql.connect(config);

    // Verificar si la conexión fue exitosa
    if (pool.connected) {
      console.log('Conexión exitosa a la base de datos Empresa.');
    } else {
      console.log('La conexión a la base de datos no fue exitosa.');
    }

    const result = await pool.request()
      .input('idUsuario', sql.Int, idUsuario)
      .execute('APPListEmpresa');

    // Cerrar la conexión
    await sql.close();

    // Capturar el resultado y enviarlo en un objeto
    const datos = result.recordset;

    return { datos };
  } catch (error) {
    console.error('Error al obtener datos de la base de datos:', error);
    throw error;
  }
}

const bEmpresa = 'PROSERVICIOS';
async function EmpresaUser(user, password, idempresa) {
  const idempresaInt = parseInt(idempresa, 10);
  const database = idempresaInt === 34 ? bEmpresa : 'PROSERVICIOS';
  console.log('database:', database);
  console.log(idempresaInt); // Verifica el valor de idempresa
console.log(typeof idempresaInt);
  const config = getConfig(database);
  try {
    // Conectar a la base de datos
    const pool = await sql.connect(config);

    // Verificar si la conexión fue exitosa
    if (pool.connected) {
      console.log('Conexión exitosa a la base de datos Empresa.');
    } else {
      console.log('La conexión a la base de datos no fue exitosa.');
    }

    const result = await pool.request()
      .input('user', sql.VarChar(120), user)
      .input('pass', sql.VarChar(100), password)
      .execute('APPValUserEmpresa');

    // Cerrar la conexión
    await sql.close();

    // Capturar el resultado y enviarlo en un objeto
    const datos = result.recordset;

    return { datos };
  } catch (error) {
    console.error('Error al obtener datos de la base de datos:', error);
    throw error;
  }
}

async function getListBodegaEmpresa(idUsuario, idempresa) {
  const idempresaInt = parseInt(idempresa, 10);
  const database = idempresaInt === 29 ? bEmpresa : 'PROSERVICIOS';
  console.log('database:', database);
  console.log(idempresaInt); // Verifica el valor de idempresa
  console.log(typeof idempresaInt);
  const config = getConfig(database);
  try {
    // Conectar a la base de datos
    const pool = await sql.connect(config);

    // Verificar si la conexión fue exitosa
    if (pool.connected) {
      console.log('Conexión exitosa a la base de datos Empresa.');
    } else {
      console.log('La conexión a la base de datos no fue exitosa.');
    }

    const result = await pool.request()
      .input('idUsuario', sql.Int, idUsuario)
      .execute('APPListBodegaEmpresa');

    // Cerrar la conexión
    await sql.close();

    // Capturar el resultado y enviarlo en un objeto
    const datos = result.recordset;

    return { datos };
  } catch (error) {
    console.error('Error al obtener datos de la base de datos:', error);
    throw error;
  }
}

async function getListHabitaciones(idBodega, idempresa) {
  const idempresaInt = parseInt(idempresa, 10);
  const database = idempresaInt === 29 ? bEmpresa : 'PROSERVICIOS';
  console.log('database:', database);
  console.log(idempresaInt); // Verifica el valor de idempresa
  console.log(typeof idempresaInt);
  const config = getConfig(database);
  try {
    // Conectar a la base de datos
    const pool = await sql.connect(config);

    // Verificar si la conexión fue exitosa
    if (pool.connected) {
      console.log('Conexión exitosa a la base de datos Empresa.');
    } else {
      console.log('La conexión a la base de datos no fue exitosa.');
    }

    const result = await pool.request()
      .input('idBodega', sql.Int, idBodega)
      .execute('AppEstadoHabitaciones');

    // Cerrar la conexión
    await sql.close();

    // Capturar el resultado y enviarlo en un objeto
    const datos = result.recordset;

    return { datos };
  } catch (error) {
    console.error('Error al obtener datos de la base de datos:', error);
    throw error;
  }
}

async function getListGuardias(idempresa) {
   
  const idempresaInt = parseInt(idempresa, 10);
  const database = idempresaInt === 29 ? bEmpresa : 'PROSERVICIOS';
  console.log('database:', database);
  console.log(idempresaInt); // Verifica el valor de idempresa
  console.log(typeof idempresaInt);
  const config = getConfig(database);
  try {
    // Conectar a la base de datos
    const pool = await sql.connect(config);

    // Verificar si la conexión fue exitosa
    if (pool.connected) {
      console.log('Conexión exitosa a la base de datos Empresa.');
    } else {
      console.log('La conexión a la base de datos no fue exitosa.');
    }

    const result = await pool.request()
      .execute('APPListaPersonalFacturas');

    // Cerrar la conexión
    await sql.close();

    // Capturar el resultado y enviarlo en un objeto
    const datos = result.recordset;

    return { datos };
  } catch (error) {
    console.error('Error al obtener datos de la base de datos:', error);
    throw error;
  }
}

async function createHabitacion(body) {
  // Convertir idempresa a entero
 
  const idempresaInt = parseInt(body.idempresa, 10);
  // Convertir otras variables a enteros
  const idBodega = parseInt(body.Bodega, 10);
  const idHabitacion = parseInt(body.idHabitacion, 10);
  const idGuardia = parseInt(body.idGuardia, 10);
  const bPromocionHabi = parseInt(body.bPromocionHabi, 10);

  const database = idempresaInt === 29 ? bEmpresa : 'PROSERVICIOS';
  console.log('database:', database);
  console.log(idempresaInt); // Verifica el valor de idempresa
  console.log(typeof idempresaInt);
  const config = getConfig(database);
  
  console.log('body:', idBodega, bPromocionHabi); 
  try {
    // Conectar a la base de datos
    const pool = await sql.connect(config);

    // Verificar si la conexión fue exitosa
    if (pool.connected) {
      console.log('Conexión exitosa a la base de datos Empresa.');
    } else {
      console.log('La conexión a la base de datos no fue exitosa.');
    }

    const result = await pool.request()
      .input('Bodega', sql.Int, idBodega)
      .input('idHabitacion', sql.Int, idHabitacion)
      .input('idGuardia', sql.Int, idGuardia)
      .input('bPromocionHabi', sql.Int, bPromocionHabi)
      .execute('GuardaMaestroFacturasAPP');

    // Cerrar la conexión
    await sql.close();

    // Capturar el resultado y enviarlo en un objeto
    const datos = result.recordset;

    return { datos };
  } catch (error) {
    console.error('Error al obtener datos de la base de datos:', error);
    throw error;
  }
}


module.exports = { obtenerDatos, ValUser, getListEmpresa,EmpresaUser, getListBodegaEmpresa, getListHabitaciones, getListGuardias, createHabitacion};

