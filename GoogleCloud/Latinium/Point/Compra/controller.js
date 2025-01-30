const fs = require('fs');
const FormData = require('form-data');
const path = require('path');
const { AppDataSource } = require("../../../../ApiCobrador/api/config/database");
const CompraCloud = require('./model');
const axios = require('axios');  // Asegúrate de importar axios

const carpetaDestino = 'C:/Doc';  // Cambia esta ruta a la carpeta donde deseas guardar los archivos temporalmente

exports.getAll = async (req, res) => {
    try {
        const registros = await AppDataSource.getRepository(CompraCloud)
            .createQueryBuilder("compra")
            .where("compra.iEstadoGoogle = :iEstadoGoogle", { iEstadoGoogle: 0 })
            .andWhere("LEN(compra.UrlCompartido) > :length", { length: 10 })
            .getMany();

        if (registros.length === 0) {
            return res.status(404).json({ message: "No se encontraron registros" });
        }

        const notificaciones = await Promise.all(
            registros.map(async (registro) => {
                try {
                    const ubicacionImagen = registro.UrlCompartido;

                    console.log('Registro:', ubicacionImagen);

                    // Ruta local donde vamos a copiar el archivo (en una carpeta específica)
                    const archivoDestino = path.join(carpetaDestino, path.basename(ubicacionImagen));

                    // Usamos una promesa para manejar la asincronía de fs.copyFile
                    await new Promise((resolve, reject) => {
                        fs.copyFile(ubicacionImagen, archivoDestino, (err) => {
                            if (err) {
                                reject('Error al copiar el archivo:', err);
                            } else {
                                console.log(`Archivo copiado a: ${archivoDestino}`);
                                resolve();
                            }
                        });
                    });

                    console.log('Archivo copiado:', registro);
                    // Ahora podemos llamar a la función enviar con el archivo copiado
                    const url = await enviar(archivoDestino, registro.idCompra, 'COMPRA', 'CLOUD');
                    console.log('URL:', url);
                    // Si se obtuvo la URL, actualizamos el estado a 1 y la URL
                    if (url) {
                        await updateEstado(registro.idCompra, 1, url);
                    } else {
                        // Si no se obtuvo URL, actualizamos el estado a 2
                        await updateEstado(registro.idCompra, 2, '');
                    }

                    // Eliminar el archivo después de la subida
                    fs.unlink(archivoDestino, (err) => {
                        if (err) {
                            console.error('Error al eliminar el archivo:', err);
                        } else {
                            console.log(`Archivo eliminado de: ${archivoDestino}`);
                        }
                    });

                } catch (error) {
                    await updateEstado(registro.idCompra, 2, '');
                    console.error('Error al procesar el registro:', error);
                }
            })
        );

        res.status(200).json(registros);
    } catch (error) {
        await updateEstado(registro.idCompra, 2, '');
        console.error('Error al obtener los registros:', error);
        res.status(500).json({ message: 'Error al obtener los registros' });
    }
};

const updateEstado = async (idCompra, iEstadoGoogle, url) => {
    try {
        const registro = await AppDataSource.getRepository(CompraCloud)
            .createQueryBuilder("compra")
            .update()
            .set({ 
                iEstadoGoogle: iEstadoGoogle,
                UrlNube: url // Actualiza ambos campos en un solo set
            })
            .where("idCompra = :idCompra", { idCompra })
            .execute();

        console.log('Registro actualizado:', registro);
    } catch (error) {
        console.error('Error al actualizar el registro:', error);
    }
};


// Función para enviar el archivo a la API de Google Cloud
const enviar = async (rutaarchivo, cedula, tipo, directorio) => {
    if (!rutaarchivo || !cedula || !tipo || !directorio) {
        console.error('Faltan parámetros para enviar el archivo');
        return;
    }
    try {
        console.log('Enviando archivo:', cedula);
        
        // Comprobamos que el archivo existe antes de continuar
        if (!fs.existsSync(rutaarchivo)) {
            console.error(`El archivo no existe en la ruta proporcionada: ${rutaarchivo}`);
            return;
        }

        // Crear una nueva instancia de FormData
        const form = new FormData();
        console.log('Formulario preparado');

        // Leer el archivo desde la ruta proporcionada
        const file = fs.createReadStream(rutaarchivo);
        console.log('Archivo leído');
        // Verificar que el archivo se haya leído correctamente
        if (!file) {
            console.error('No se pudo leer el archivo correctamente.');
            return;
        }

        // Adjuntar el archivo y los parámetros
        console.log('Archivo leído ..12');
        form.append('file', file, path.basename(rutaarchivo)); // El archivo real y su nombre
        console.log('Archivo leído ..13');
        form.append('cedula', cedula);
        console.log('Archivo leído ..1374');
        form.append('tipo', tipo);
        console.log('Archivo leído ..15');
        form.append('Directorio', directorio);

        console.log('Formulario listo para enviar');

        // Realizar la solicitud POST a la API
        const response = await axios.put('http://192.168.2.167:3025/cobranza/api/v1/point/googleApi/google/Latinium', form, {
            headers: {
                ...form.getHeaders(), // Necesario para incluir los encabezados de FormData
            }
        });

        // Mostrar la respuesta de la API
        console.log('Respuesta de la API:', response.data);

        // Si todo fue bien, devolvemos la URL del archivo subido
        return response.data.url; // Suponiendo que la respuesta tiene una URL
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        // Manejar el error adecuadamente
        return { message: "Error al enviar la solicitud", error: error.message };
    }
};
