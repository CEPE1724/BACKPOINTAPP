const { AppDataSource } = require("../config/database");
const Cbo_GestorDeCobranzas = require('./model');
const { Like, Repository, Brackets } = require('typeorm'); // Asegúrate de que `Brackets` esté importado

exports.allCbo_GestorCount = async (req, res) => {
  const { idCobrador } = req.body;  // Asegúrate de que idCobrador esté presente en el cuerpo de la solicitud

  if (!idCobrador) {
    return res.status(400).json({ message: "Falta parametros." });
  }

  try {
    const Cbo_GestorDeCobranzasRepository = AppDataSource.getRepository(Cbo_GestorDeCobranzas);
    // Utilizamos el queryBuilder para realizar una consulta con agregaciones
    const result = await Cbo_GestorDeCobranzasRepository.createQueryBuilder('c')
      .select('SUM(c.Valor_Cobrar_Proyectado)', 'totalProjected')
      .addSelect('SUM(c.Valor_Cobrado)', 'totalCollected')
      .addSelect('COUNT(1)', 'count')
      .where('c.idcobrador = :idCobrador', { idCobrador })
      .andWhere('c.notcobrador = 1')
      .getRawOne(); // getRawOne devuelve los resultados en formato JSON

    res.json(result); // Envía la respuesta JSON con los resultados

  } catch (error) {
    console.error("Error al realizar la consulta:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};



exports.allCbo_Gestor = async (req, res) => {
  const { idCobrador, filtro } = req.query; // Obtener los parámetros de consulta
  const page = parseInt(req.query.page) || 1; // Página actual
  const limit = parseInt(req.query.limit) || 200; // Número de registros por página
  try {
    const offset = (page - 1) * limit; // Calcular el desplazamiento

    const queryBuilder = AppDataSource.getRepository(Cbo_GestorDeCobranzas).createQueryBuilder('c');

    // Construir la consulta
    queryBuilder
      .where('c.idcobrador = :idCobrador', { idCobrador })
      .andWhere('c.notcobrador = 1')
      .andWhere(
        new Brackets(qb => {
          qb.where('c.Cliente LIKE :filtro')
            .orWhere('c.Cedula LIKE :filtro')
            .orWhere('c.Numero_Documento LIKE :filtro');
        })
      )
      .setParameters({ filtro: `%${filtro}%` })
      .skip(offset)
      .take(limit);

    // Ejecutar la consulta
    const [registros, total] = await queryBuilder.getManyAndCount();

    res.json([registros, total]); // Enviar la respuesta JSON con los registros y el total
  } catch (error) {
    console.error("Error al realizar la consulta:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

exports.fullCbo_Gestor = async (req, res) => {
  const { idCobrador } = req.query; // Obtener los parámetros de consulta

  try {
    const queryBuilder = AppDataSource.getRepository(Cbo_GestorDeCobranzas).find({
      where: { idcobrador: idCobrador, notcobrador: 1 }
    });
     
    const registros = await queryBuilder;
    res.json(registros); // Enviar la respuesta JSON con los registros
  } catch (error) {
    console.error("Error al realizar la consulta:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

exports.allCbo_Gestor_idCompra = async (req, res) => {
  const { idCompra } = req.params; // Obtener idCompra desde los parámetros de la ruta
  try {
    const registros = await AppDataSource.getRepository(Cbo_GestorDeCobranzas).find({
      where: { idCompra }
    });

    res.json(registros); // Enviar la respuesta JSON con los registros
  }
  catch (error) {
    console.error("Error al realizar la consulta:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
