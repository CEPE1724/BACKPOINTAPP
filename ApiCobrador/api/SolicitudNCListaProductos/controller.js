const { AppDataSource } = require("../config/database");
const { body, validationResult } = require('express-validator');

exports.all = async (req, res) => {
    try {
        const { idCompra, idMotivo } = req.query;

        const result = await AppDataSource.query(
            `EXEC SolicitudNCListaProductos @idCompra = ${idCompra}, @idMotivo = ${idMotivo}`
        );

        res.json(result); // Envía los resultados al cliente
    } catch (err) {
        console.error("Error al ejecutar el procedimiento almacenado:", err);
        res.status(500).send("Error al ejecutar el procedimiento almacenado.");
    }
};


exports.find = async (req, res) => {
    try {
        const result = await AppDataSource.query(
            `EXEC ListaCuentasDepositos`
        );

        res.json(result); // Envía los resultados al cliente
    } catch (err) {
        console.error("Error al ejecutar el procedimiento almacenado:", err);
        res.status(500).send("Error al ejecutar el procedimiento almacenado.");
    }
}

exports.insert = [
    // Validaciones de entrada
    body('idCbo_GestorDeCobranzas').isInt().withMessage('idCbo_GestorDeCobranzas debe ser un entero'),
    body('idCompra').isInt().withMessage('idCompra debe ser un entero'),
    body('idPersonal').isInt().withMessage('idPersonal debe ser un entero'),
    body('Fecha').isISO8601().withMessage('Fecha debe ser una fecha válida en formato ISO'),
    body('idCbo_EstadoGestion').isInt().withMessage('idCbo_EstadoGestion debe ser un entero'),
    body('idCbo_EstadosTipocontacto').isInt().withMessage('idCbo_EstadosTipocontacto debe ser un entero'),
    body('idCbo_ResultadoGestion').isInt().withMessage('idCbo_ResultadoGestion debe ser un entero'),
    body('Notas').isString().isLength({ max: 300 }).withMessage('Notas debe ser una cadena de texto con un máximo de 300 caracteres'),
    body('Telefono').isString().isLength({ max: 15 }).withMessage('Telefono debe ser una cadena de texto con un máximo de 15 caracteres'),
    body('FechaPago').isISO8601().withMessage('FechaPago debe ser una fecha válida en formato ISO'),
    body('Valor').isDecimal().withMessage('Valor debe ser un número decimal'),
    body('Usuario').isString().isLength({ max: 50 }).withMessage('Usuario debe ser una cadena de texto con un máximo de 50 caracteres'),

    // Controlador
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            idCbo_GestorDeCobranzas,
            idCompra,
            idPersonal,
            Fecha,
            idCbo_EstadoGestion,
            idCbo_EstadosTipocontacto,
            idCbo_ResultadoGestion,
            Notas,
            idCliente,
            Telefono,
            FechaPago,
            Valor,
            Usuario
        } = req.body;

        try {
            const result = await AppDataSource.query(
                `EXEC GuardaCbo_GestionesDeCobranzasAPP 
                @idCbo_GestorDeCobranzas = ${idCbo_GestorDeCobranzas},
                @idCompra = ${idCompra},
                @idPersonal = ${idPersonal},
                @Fecha = '${Fecha}',
                @idCbo_EstadoGestion = ${idCbo_EstadoGestion},
                @idCbo_EstadosTipocontacto = ${idCbo_EstadosTipocontacto},
                @idCbo_ResultadoGestion = ${idCbo_ResultadoGestion},
                @Notas = '${Notas}',
                @Telefono = '${Telefono}',
                @FechaPago = '${FechaPago}',
                @Valor = ${Valor},
                @Usuario = '${Usuario}'`,                
            );

            res.status(200).json({ message: 'Datos insertados correctamente', result });
        } catch (err) {
            console.error("Error al ejecutar el procedimiento almacenado:", err);
            res.status(500).send("Error al ejecutar el procedimiento almacenado.");
        }
    }
];



exports.insertDeposito = [

    // Validaciones de entrada
    body('Fecha').isISO8601().withMessage('Fecha debe ser una fecha válida en formato ISO'),
    body('IdCliente').isInt().withMessage('IdCliente debe ser un entero'),
    body('IdBanco').isInt().withMessage('IdBanco debe ser un entero'),
    body('Abono').isDecimal().withMessage('Abono debe ser un número decimal'),
    body('IdCompra').isInt().withMessage('IdCompra debe ser un entero'),
    body('NumeroDeposito').isString().isLength({ max: 20 }).withMessage('NumeroDeposito debe ser una cadena de texto con un máximo de 20 caracteres'),
    body('Usuario').isString().isLength({ max: 50 }).withMessage('Usuario debe ser una cadena de texto con un máximo de 50 caracteres'),
   // controller
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            Fecha,
            IdCliente,
            IdBanco,
            Abono,
            IdCompra,
            NumeroDeposito,
            Usuario,
            Url
        } = req.body;

        try {
            const result = await AppDataSource.query(
                `EXEC GrabaDepositosPendientesAPP 
                @Fecha = '${Fecha}',
                @IdCliente = ${IdCliente},
                @IdBanco = ${IdBanco},
                @Abono = ${Abono},
                @IdCompra = ${IdCompra},
                @NumeroDeposito = '${NumeroDeposito}',
                @Usuario = '${Usuario}',
                @Url = '${Url}'`
            );

            res.status(200).json({ message: 'Datos insertados correctamente', result });
        } catch (err) {
            console.error("Error al ejecutar el procedimiento almacenado:", err);
            res.status(500).send("Error al ejecutar el procedimiento almacenado.");
        }
    }
];

exports.insertRecojo = [
        // Validaciones de entrada
        body('idCbo_GestionesDeCobranzas').isInt().withMessage('idCbo_GestionesDeCobranzas debe ser un entero'),
        body('idCompra').isInt().withMessage('idCompra debe ser un entero'),
        body('idDetCompra').isInt().withMessage('idDetCompra debe ser un entero'),
        body('Nota').isString().isLength({ max: 500 }).withMessage('Nota debe ser una cadena de texto con un máximo de 50 caracteres'),
        body('Imagenes').isArray().withMessage('Imagenes debe ser un arreglo de imágenes'),
      
        // Controlador
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
      
            const {
                idCbo_GestionesDeCobranzas,
                idCompra,
                idDetCompra,
                Nota,
                Imagenes
            } = req.body;
      
            try {
                const result = await AppDataSource.query(
                    `EXEC GrabaRecojoAPP 
                    @idCbo_GestionesDeCobranzas = ${idCbo_GestionesDeCobranzas},
                    @idCompra = ${idCompra},
                    @idDetCompra = ${idDetCompra},
                    @Nota = '${Nota}',
                    @Imagenes = '${Imagenes}'`
                );
      
                res.status(200).json({ message: 'Datos insertados correctamente', result });
            } catch (err) {
                console.error("Error al ejecutar el procedimiento almacenado:", err);
                res.status(500).send("Error al ejecutar el procedimiento almacenado.");
            }
        }
    ];

exports.insertAnticipos = [
    // Validaciones de entrada
    body('idCompra').isInt().withMessage('idCompra debe ser un entero'),
    body('Abono').isDecimal().withMessage('Abono debe ser un número decimal'),
    body('Usuario').isString().isLength({ max: 50 }).withMessage('Usuario debe ser una cadena de texto con un máximo de 50 caracteres'),

    // Controlador
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            idCompra,
            Abono,
            Usuario
        } = req.body;

        try {
            const result = await AppDataSource.query(
                `EXEC GuardaAnticiposAPP 
                @idCompra = ${idCompra},
                @Abono = ${Abono},
                @Usuario = '${Usuario}'`
            );

            res.status(200).json({ message: 'Datos insertados correctamente', result });
        } catch (err) {
            console.error("Error al ejecutar el procedimiento almacenado:", err);
            res.status(500).send("Error al ejecutar el procedimiento almacenado.");
     
        }
    }
];
