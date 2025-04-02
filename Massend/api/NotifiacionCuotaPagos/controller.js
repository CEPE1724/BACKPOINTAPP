const { AppDataSource } = require("../../../ApiCobrador/api/config/database"); // Asegúrate de que 'AppDataSource' esté bien importado
const NotifiacionCuotaPagos = require('./model'); // Asegúrate de que 'Bodega' esté bien importado
const axios = require('axios');

// Obtener notificaciones de cuotas de pagos por los IDs enviados como parámetros en la URL

exports.getNotifiacionCuotaPagosPorEstado = async (req, res) => {
    try {
        // Obtener el parámetro 'estado' desde la URL
        const { estado } = req.query; // Recibimos el parámetro como cadena
        
        if( estado == undefined || estado == null || estado == '' ){
            return res.status(400).json({ message: "Parámetros de estado no válidos." });
        }

        const estadoInt = parseInt(estado);

        const registros = await AppDataSource.getRepository(NotifiacionCuotaPagos).find({
            where: {
                estado: estadoInt
            }
        });

        if (registros.length === 0) {
            return res.status(404).json({ message: "No se encontraron registros" });
        }
        
        const notificaciones = await Promise.all(
            registros.map(async (registro) => {
                try {
                    // Llamamos a la función getDataNotificacion para cada 'idAnticipo'
                    const dataNotificacion = await getDataNotificacion(registro.idAnticipo);
                    // Verificamos si dataNotificacion tiene elementos
                    if (dataNotificacion && dataNotificacion.length > 0) {
                        const { Celular, Nombre, Valor, ProximoPago, FechaPago, Tipo } = dataNotificacion[0];
                        // Verificamos si los campos son válidos
                        if (Celular && Valor && Valor > 0 && registro.idNotifiacionCuotaPagos > 0 && Nombre) {
                            console.log(Celular, Nombre, Valor, ProximoPago, FechaPago, Tipo);
                            // Actualizamos el registro con la información de la notificación
                            await updateNotificacionCuotaPagos(registro.idNotifiacionCuotaPagos, Celular, Valor);
                            if (Tipo === 1) {
                                // Enviamos el mensaje de texto
                                const ProximoPagoFormatted = formatDate(ProximoPago); // Formateamos la fecha
                                if (!ProximoPagoFormatted) {
                                    await updateEstadoId(registro.idNotifiacionCuotaPagos,  'SN');
                                    return { ...registro, error: "Error al formatear la fecha" };
                                }
                                if (Celular.length < 10) {
                                    await updateEstadoId(registro.idNotifiacionCuotaPagos,  'SN');
                                    return { ...registro, error: "Número de celular inválido" };
                                }
                                if (Nombre.length === 0) {
                                    await updateEstadoId(registro.idNotifiacionCuotaPagos,  'SN');
                                    return { ...registro, error: "Nombre vacío" };
                                }
                                if (Valor <= 0) {
                                    await updateEstadoId(registro.idNotifiacionCuotaPagos,  'SN');
                                    return { ...registro, error: "Valor inválido" };
                                }
                                const response = await enviar_mensaje_variable_fecha(Celular, Nombre, Valor, ProximoPagoFormatted);
                                const status = response.errorinfo ;
                                const cod_error = response.cod_error;
                                await updateEstadoId(registro.idNotifiacionCuotaPagos,  cod_error);
                                console.log("mensaje envio",status, cod_error);
                            }
                            if (Tipo === 2) {
                                // Enviamos el mensaje de texto
                                console.log("mensaje envio ....2",Celular, Nombre, Valor);
                                if (Celular.length < 10) {
                                    await updateEstadoId(registro.idNotifiacionCuotaPagos,  'SN');
                                    return { ...registro, error: "Número de celular inválido" };
                                }
                                if (Nombre.length === 0) {
                                    await updateEstadoId(registro.idNotifiacionCuotaPagos,  'SN');
                                    return { ...registro, error: "Nombre vacío" };
                                }
                                if (Valor <= 0) {
                                    await updateEstadoId(registro.idNotifiacionCuotaPagos,  'SN');
                                    return { ...registro, error: "Valor inválido" };
                                }
                                const response = await enviar_mensaje_variables(Celular, Nombre, Valor);
                                const status = response.errorinfo ;
                                const cod_error = response.cod_error;
                                await updateEstadoId(registro.idNotifiacionCuotaPagos,  cod_error);
                                console.log("mensaje envio",status, cod_error);
                            }
                        }

                        return { ...registro, dataNotificacion: dataNotificacion[0] };
                    } else {
                        await updateEstadoId(registro.idNotifiacionCuotaPagos,  'SN');
                        console.error("No se encontró la notificación o datos vacíos");
                        return { ...registro, error: "No se encontró la notificación" };
                    }

                } catch (error) {
                    console.error("Error procesando el registro:", error);
                    return { ...registro, error: error.message };
                }
            })
        );

        res.status(200).json(notificaciones);
        
        // recorrer resgitrso y traer el mensaje de notificacion
        
    }
    catch (error) {
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


 const getDataNotificacion = async (idAnticipo) => {
    try {

        const result = await AppDataSource.query(
            `EXEC MensajeNotificacionPago @idAnticipo = ${idAnticipo}`
        );

        return result;
    } catch (error) {
        console.error("Error al ejecutar el procedimiento almacenado:", error);
        throw new Error("Error al ejecutar la consulta.");
    }
};

const updateNotificacionCuotaPagos = async (idNotifiacionCuotaPagos, Celular, Valor) => {
    try {
        const notificacion = await AppDataSource.getRepository(NotifiacionCuotaPagos).findOne({
            where: {
                idNotifiacionCuotaPagos
            }
        });

        if (!notificacion) {
            throw new Error("Registro no encontrado");
        }

        notificacion.Celular = Celular;
        notificacion.Valor = Valor;

        await AppDataSource.getRepository(NotifiacionCuotaPagos).save(notificacion);
        return notificacion;
    } catch (error) {
        console.error("Error al actualizar el registro:", error);
        throw new Error("Error al actualizar el registro.");
    }
};

const enviar_mensaje_variables = async (Celular, Nombre, Valor) => {
    if (!Celular || !Nombre || !Valor) {
        return "Nombre, Valor o ProximoPago están en blanco.";
    }
    const postData = {
        user: "Point@massend.com",
        pass: "CompuPoint$2023",
        mensajeid: "41864",
        campana: "nombre de campana",
        telefono: Celular,
        tipo: "1",
        ruta: "0",
        datos: `${Nombre}, ${Valor}`
    };

    try {
        const response = await axios.post('https://api.massend.com/api/sms', postData, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data.RefError;
    } catch (error) {
        console.error("Error al enviar mensaje:", error);
        return "Error al enviar el mensaje.";
    }
};


const enviar_mensaje_variable_fecha = async (Celular, Nombre, Valor, ProximoPago) => {
    if (!Celular || !Nombre || !Valor || !ProximoPago) {
        return "Nombre, Valor o ProximoPago están en blanco.";
    }

    const postData = {
        user: "Point@massend.com",
        pass: "CompuPoint$2023",
        mensajeid: "44628",
        campana: "nombre de campana",
        telefono: Celular,
        tipo: "1",
        ruta: "0",
        datos: `${Nombre}, ${Valor},${ProximoPago}`
    };

    try {
        const response = await axios.post('https://api.massend.com/api/sms', postData, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data.RefError;
    } catch (error) {
        console.error("Error al enviar mensaje:", error);
        return "Error al enviar el mensaje.";
    }
};



const updateEstadoId = async (idNotifiacionCuotaPagos, cod_error) => {
    try {
        let status = 'error';
        console.log("cod_error", cod_error);

        // Verificar si cod_error es numérico y convertirlo a cadena
        let codErrorValue;
        if (typeof cod_error === 'number') {
            // Si es un número (como 100 o 210), lo convertimos explícitamente a cadena
            codErrorValue = cod_error.toString();
        } else {
            // Si ya es una cadena (como "OP204"), lo dejamos tal cual
            codErrorValue = cod_error;
        }
        // Determinar el status basado en el código de error
        if (codErrorValue === '100') {
            status = 'success';
        }
        const notificacion = await AppDataSource.getRepository(NotifiacionCuotaPagos).findOne({
            where: {
                idNotifiacionCuotaPagos
            }
        });

        if (!notificacion) {
            throw new Error("Registro no encontrado");
        }

        const estado = status === 'success' ? 1 : 2;
        console.log("estado", estado);

        // Formatear la fecha actual
        const FechaActual = formatDate(new Date());
        
        // Asignar los valores correctamente al objeto
        notificacion.errorinfo = status;
        notificacion.cod_error = codErrorValue; // Asegurarse de que se trata como string
        notificacion.fechaNotificacion = FechaActual;
        notificacion.estado = parseInt(estado);  // Asegurarse de que el estado sea un número

        await AppDataSource.getRepository(NotifiacionCuotaPagos).save(notificacion);
        return notificacion;
    } catch (error) {
        console.error("Error al actualizar el registro:", error);
        throw new Error("Error al actualizar el registro.");
    }
};

const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};


