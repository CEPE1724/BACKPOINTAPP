const AppDataSource = require('./api/config/database');

async function connectDatabase() {
  try {
    await AppDataSource.initialize();
    console.log('Conexión exitosa a SQL Server');

    // Aquí puedes definir y utilizar tus entidades
    // const repository = AppDataSource.getRepository(YourEntity);
    // const data = await repository.find();
    // console.log('Datos obtenidos:', data);
  } catch (error) {
    console.error('Error durante la conexión:', error);
  }
}

connectDatabase(); 
