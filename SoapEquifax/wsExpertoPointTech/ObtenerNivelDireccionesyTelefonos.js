const soap = require('soap');
const { AppDataSource } = require("../../ApiCobrador/api/config/database");
const EQFX_DobleInfo = require('../../Equifax/api/NivelDireccionesyTelefonos/EQFX_DobleInfo/model');
const EQFX_DetalleDirecciones = require('../../Equifax/api/NivelDireccionesyTelefonos/EQFX_DetalleDirecciones/model');
const EQFX_DetalleTelefonos = require('../../Equifax/api/NivelDireccionesyTelefonos/EQFX_DetalleTelefonos/model');
const urlPrueba = 'https://test.equifax.com.ec/wsExpertoPointTech/wsExpertoPointTech.asmx?wsdl';
const url = 'https://www.equifax.com.ec/wsExpertoPointTech/wsExpertoPointTech.asmx?wsdl';
const consultarDireccionesYTelefonos = (idEQFX_IdentificacionConsultada, idReportePadre, tipoDocumento, numeroDocumento) => {
    return new Promise((resolve, reject) => {
        const args = {
            idReportePadre: idReportePadre,
            tipoDocumento: tipoDocumento,
            numeroDocumento: numeroDocumento
        };

        console.log('args:', args);

        const usuario = 'wsCOMPUBUSSINES';
        const clave = 'Point593_2';

        if (!usuario || !clave) {
            return reject('Faltan las credenciales en las variables de entorno');
        }

        // Crear un header XML explícito para asegurarse de que el namespace sea correcto
        const soapHeader = `
            <CabeceraCR xmlns="http://www.creditreport.ec/">
                <Usuario>${usuario}</Usuario>
                <Clave>${clave}</Clave>
            </CabeceraCR>
        `;

        const options = {
            ignoredNamespaces: {
                namespaces: ['soap', 'xsi', 'xsd'],
                override: true
            },
            xmlHeaders: {
                'Content-Type': 'application/soap+xml; charset=utf-8',
                'SOAPAction': 'http://www.creditreport.ec/ObtenerNivelDireccionesyTelefonos'
            }
        };

        soap.createClient(url, options, (err, client) => {
            if (err) {
                console.error('Error al crear el cliente SOAP:', err);
                return reject('Error al crear el cliente SOAP');
            }

            const methodName = 'ObtenerNivelDireccionesyTelefonos';
            const service = client.wsExpertoPointTech.wsExpertoPointTechSoap;

            try {
                let countDataDYT = 0;
                let countIfdataDYT = 0;
                client.addSoapHeader(soapHeader);

                service[methodName](args, async (err, result) => {
                    if (err) {
                        console.error('Error al realizar la solicitud SOAP:', err);
                        return reject('Error al realizar la solicitud SOAP');
                    }

                    if (result && result.ObtenerNivelDireccionesyTelefonosResult && result.ObtenerNivelDireccionesyTelefonosResult.diffgram) {
                        const data = result.ObtenerNivelDireccionesyTelefonosResult.diffgram.NewDataSet;
                         countDataDYT = Object.keys(data).length;
                        if (data && data.IdentificacionConsultada) {
                            countIfdataDYT = countIfdataDYT + 1;
                            const identificacionData = Array.isArray(data.IdentificacionConsultada) ? data.IdentificacionConsultada[0] : data.IdentificacionConsultada;
                            const registro = {
                                NombreSujeto: handleEmptyString(identificacionData.NombreSujeto),
                                TipoDocumentoDobleInfo: handleEmptyString(identificacionData.TipoDocumentoDobleInfo),
                                NumeroDocumentoDobleInfo: handleEmptyString(identificacionData.NumeroDocumentoDobleInfo),
                                idEQFX_IdentificacionConsultada
                            };

                            console.log('Registro EQFX_DobleInfo:', registro);

                            try {
                                const repository = AppDataSource.getRepository(EQFX_DobleInfo);
                                await repository.save(registro);
                                console.log('Registro guardado en EQFX_DobleInfo');
                            } catch (dbError) {
                                console.error('Error al guardar el registro EQFX_DobleInfo:', dbError);
                                reject('Error al guardar el registro EQFX_DobleInfo');
                            }
                        }

                        // Guardar DetalleDirecciones
                        if (data && data.DetalleDirecciones) {
                            countIfdataDYT = countIfdataDYT + 1;
                            const detalleDirecciones = Array.isArray(data.DetalleDirecciones) ? data.DetalleDirecciones : [data.DetalleDirecciones];
                            for (let i = 0; i < detalleDirecciones.length; i++) {
  
                                const item = detalleDirecciones[i];
                                const registro = {
                                    idEQFX_IdentificacionConsultada,
                                    Direccion: handleEmptyString(item.Column1)
                                };

                                console.log('Registro EQFX_DetalleDirecciones:', registro);

                                try {
                                    const repository = AppDataSource.getRepository(EQFX_DetalleDirecciones);
                                    await repository.save(registro);
                                    console.log('Registro guardado en EQFX_DetalleDirecciones');
                                } catch (dbError) {
                                    console.error('Error al guardar el registro EQFX_DetalleDirecciones:', dbError);
                                }
                            }
                        }

                        // Guardar DetalleTelefonos
                        if (data && data.DetalleTelefonos) {
                            
                            countIfdataDYT = countIfdataDYT + 1;
                            const detalleTelefonos = Array.isArray(data.DetalleTelefonos) ? data.DetalleTelefonos : [data.DetalleTelefonos];
                            for (let i = 0; i < detalleTelefonos.length; i++) {
                                const item = detalleTelefonos[i];
                                const registro = {
                                    idEQFX_IdentificacionConsultada,
                                    telefono: handleEmptyString(item.telefono)
                                };

                                console.log('Registro EQFX_DetalleTelefonos:', registro);

                                try {
                                    const repository = AppDataSource.getRepository(EQFX_DetalleTelefonos);
                                    await repository.save(registro);
                                    console.log('Registro guardado en EQFX_DetalleTelefonos');
                                } catch (dbError) {
                                    console.error('Error al guardar el registro EQFX_DetalleTelefonos:', dbError);
                                }
                            }
                        }

                        resolve({ countIfdataDYT, countDataDYT });
                    } else {
                        console.error('No se encontraron datos en la respuesta');
                        resolve({ countIfdataDYT, countDataDYT });
                    }
                });
            } catch (error) {
                console.error('Error al procesar la respuesta SOAP:', error);
                resolve({ countIfdataDYT, countDataDYT });
            }
        });
    });
};

const handleEmptyString = (value) => {
    if (value === null || value === undefined) {
        return ''; // Devuelve cadena vacía si es nulo o indefinido
    }
    if (typeof value === 'string') {
        return value.trim() === '' ? '' : value;
    }
    return ''; // Si no es una cadena, devuelve cadena vacía
};

module.exports = {
    consultarDireccionesYTelefonos
};
