const { where } = require('sequelize');

const { AppDataSource } = require("../config/database");
const GestionDiaria = require('./model');
const cbo_GestordeCobranza = require('../Cbo_GestorDeCobranzas/model');
const { parse, isDate, format } = require('date-fns'); // Import date-fns functions
const { Like, Repository, Brackets, Between } = require('typeorm'); // Asegúrate de que `Brackets` esté importado

exports.addNew = async (req, res) => {
    const { clientes, Users, Compromiso, Usuario, idCobrador } = req.body;

    try {
        // Validar que hay clientes
        if (!Array.isArray(clientes) || clientes.length === 0) {
            return res.status(400).json({ message: "El campo 'clientes' es obligatorio y debe contener al menos un cliente." });
        }
        if (!idCobrador) {
            return res.status(400).json({ message: "El campo 'idCobrador' es obligatorio." });
        }

        const resultados = [];
        const errores = [];
        let registrosSinIdCompra = 0;

        for (const cliente of clientes) {
            const { Dia, Cedula } = cliente;

            // Validaciones
            if (!Cedula || !Dia) {
                errores.push({ Cedula, message: "Faltan campos obligatorios" });
                continue;
            }

            // Validar fecha
            const fecha = new Date(Dia);
            if (isNaN(fecha.getTime())) {
                errores.push({ Cedula, message: "Fecha inválida" });
                continue; // Salta al siguiente cliente
            }

            // Consulta en cbo_getsordecobranza para obtener el último registro
            const cobrador = await AppDataSource.getRepository(cbo_GestordeCobranza)
                .find({
                    where: {
                        idcobrador: idCobrador,
                        Cedula: Cedula
                    },
                    order: { idCompra: 'DESC' }, // Suponiendo que hay un campo 'createdAt' para el orden
                    take: 1 // Solo queremos el último registro
                });

            // Verificar si existe
            if (!cobrador || cobrador.length === 0) {
                errores.push({ Cedula, message: "Cliente no esta Asignado al cobrador." });
                continue; // Salta al siguiente cliente
            }

            const lastCobrador = cobrador[0]; // Tomamos el último registro

            // Verificar si idCompra está disponible
            if (!lastCobrador.idCompra) {
                registrosSinIdCompra++;
                continue; // Salta al siguiente cliente
            }

            // Formatear la fecha para comparar solo el día
            const fechaFormatted = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());

            // Verificar si ya existe un registro en GestionDiaria
            const registroExistente = await AppDataSource.getRepository(GestionDiaria)
                .findOne({
                    where: {
                        idCompra: lastCobrador.idCompra,
                        idCobrador: idCobrador,
                        Dia: fechaFormatted
                    }
                });

            if (registroExistente) {
                errores.push({ Cedula, message: "Ya existe un registro para esta combinación  Fecha." });
                continue; // Salta al siguiente cliente
            }

            // Crear objeto de registro
            const registro = {
                idCobrador,
                Cedula,
                idCompra: lastCobrador.idCompra,
                Compromiso,
                Dia: fecha,
                FechaSistema: new Date(),
                Estacion: "APP",
                Users,
                Usuario
            };
            // Guardar el registro
            try {
                const repository = AppDataSource.getRepository(GestionDiaria);
                await repository.save(registro);
                resultados.push({ Cedula, message: "Registro insertado correctamente" });
            } catch (error) {
                errores.push({ Cedula, message: "Error al insertar registro", error });
            }
        }
        // Respuesta final con resumen
        res.json({
            total: clientes.length,
            insertados: resultados.length,
            errores: errores.length,
            registrosSinIdCompra,
            detallesErrores: errores
        });
    } catch (error) {
        console.error("Error al procesar registros:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

exports.allGestionId = async (req, res) => {
    const { id } = req.params;
    try {
        const repository = AppDataSource.getRepository(GestionDiaria);

        // Obtener la fecha actual
        const currentDate = new Date();

        // Definir el primer día del mes actual
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        // Definir el último día del mes actual
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        // Find all records for the specified idCobrador and that are in the current month
        const results = await repository.find({
            where: {
                idCobrador: id,
                Dia: Between(firstDayOfMonth, lastDayOfMonth) // Filtrar por fecha dentro del mes actual
            }
        });

        // Process results to count and group by 'Dia'
        const groupedResults = results.reduce((acc, record) => {
            // Convert Dia to Date if it's a string
            const dia = typeof record.Dia === 'string' ? new Date(record.Dia) : record.Dia;

            // Format the date to YYYY-MM-DD
            const formattedDia = dia instanceof Date && !isNaN(dia) ? dia.toISOString().split('T')[0] : "Sin Fecha";

            // Capture the day from the date
            const day = dia instanceof Date && !isNaN(dia) ? dia.getUTCDate() : "Sin Día";

            if (!acc[formattedDia]) {
                acc[formattedDia] = { Total: 0, Gestionado: 0, Dia: formattedDia, Day: day }; // Initialize
            }

            acc[formattedDia].Total += 1; // Increment total count
            acc[formattedDia].Gestionado += record.Gestionado || 0; // Sum 'Gestionado'

            return acc;
        }, {});

        // Convert grouped results back to an array
        const response = Object.values(groupedResults);

        res.json(response);
    } catch (error) {
        console.error("Error al obtener registros:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};



exports.allGestion = async (req, res) => {
    const { idcobrador, fullDate, filtro } = req.query;
    const page = parseInt(req.query.page) || 1; // Current page
    const limit = parseInt(req.query.limit) || 200; // Number of records per page

    if (!idcobrador) {
        return res.status(400).json({ message: 'idcobrador is required.' });
    }
    if (!fullDate) {
        return res.status(400).json({ message: 'fullDate is required.' });
    }

    // Validate and format fullDate
    const parsedDate = parse(fullDate, 'yyyy-MM-dd', new Date());

    if (!isDate(parsedDate) || isNaN(parsedDate)) {
        return res.status(400).json({ message: 'Invalid date format. Use yyyy-MM-dd.' });
    }

    // Format date to the desired format
    const formattedDate = format(parsedDate, 'yyyy-MM-dd');
    try {
        const repository = AppDataSource.getRepository(GestionDiaria);

        // Fetch only the idCompra field
        const results = await repository
            .createQueryBuilder('gestion')
            .select('gestion.idCompra')
            .where('gestion.idCobrador = :idCobrador', { idCobrador: idcobrador })
            .andWhere('CONVERT(date, gestion.Dia) = CONVERT(date, :formattedDate)', { formattedDate })
            .getMany();

        // Extract idCompra values
        const idCompras = results.map(result => result.idCompra);
        // Check if results are found
        if (idCompras.length > 0) {
            // Now query Cbo_GestorDeCobranzas using the idCompras
            const cboGestorResults = await allCbo_Gestor(idcobrador, filtro, page, limit, idCompras);
            res.json(cboGestorResults);
        } else {
            res.status(404).json({ message: 'No purchases found for the given parameters.' });
        }
    } catch (error) {
        console.error("Error al obtener registros:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Function to get Cbo_GestorDeCobranzas data
const allCbo_Gestor = async (idCobrador, filtro, page, limit, idCompras) => {
    try {
        const offset = (page - 1) * limit; // Calculate offset

        const queryBuilder = AppDataSource.getRepository(cbo_GestordeCobranza).createQueryBuilder('c');

        // Build the query
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
            .setParameters({ filtro: `%${filtro}%` });

        // If idCompras is not empty, add it to the query
        if (idCompras.length > 0) {
            queryBuilder.andWhere('c.idCompra IN (:...idCompras)', { idCompras });
        }
        console.log(queryBuilder.getSql()); // Muestra la consulta SQL generada
        queryBuilder.skip(offset).take(limit);

        // Execute the query
        const [registros, total] = await queryBuilder.getManyAndCount();

        return { registros, total }; // Return the results
    } catch (error) {
        console.error("Error al realizar la consulta:", error);
        throw new Error("Error interno del servidor");
    }
};

