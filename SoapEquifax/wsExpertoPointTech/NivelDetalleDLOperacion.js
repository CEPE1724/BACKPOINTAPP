const soap = require('soap');
const { AppDataSource } = require("../../ApiCobrador/api/config/database");
const EQFX_DetalleOperacion = require('../../Equifax/api/NivelDetalleDeLaOperacion/EQFX_DetalleOperacion/model');
const urlPrueba = 'https://test.equifax.com.ec/wsExpertoPointTech/wsExpertoPointTech.asmx?wsdl';
const url = 'https://www.equifax.com.ec/wsExpertoPointTech/wsExpertoPointTech.asmx?wsdl';
const consultarNivelDetalleDeLaOperacion = (idEQFX_IdentificacionConsultada, idReportePadre, tipoDocumento, numeroDocumento) => {
    return new Promise((resolve, reject) => {
        const args = {
            idReportePadre: idReportePadre,
            tipoDocumento: tipoDocumento,
            numeroDocumento: numeroDocumento,
            codigoInstitucion: 1002,
            numeroOperacion: "00000000000014135639",
            codigoTC: 0,
            codigoTarjeta: 0,
            fechaCorte: new Date().toISOString().split('T')[0],  // Fecha en formato yyyy-mm-dd
            codigoTipoDeudor: "T"

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
                'SOAPAction': 'http://www.creditreport.ec/ObtenerNivelDetalleDeLaOperacion'
            }
        };

        soap.createClient(url, options, (err, client) => {
            if (err) {
                console.error('Error al crear el cliente SOAP:', err);
                return reject('Error al crear el cliente SOAP');
            }

            const methodName = 'ObtenerNivelDetalleDeLaOperacion';
            const service = client.wsExpertoPointTech.wsExpertoPointTechSoap;

            try {
                let countDataDLOR = 0;
                let countIfdataDLOR = 0;
                client.addSoapHeader(soapHeader);

                service[methodName](args, async (err, result) => {
                    if (err) {
                        console.error('Error al realizar la solicitud SOAP:', err);
                        return reject('Error al realizar la solicitud SOAP');
                    }

                    if (result && result.ObtenerNivelDetalleDeLaOperacionResult && result.ObtenerNivelDetalleDeLaOperacionResult.diffgram) {
                        const data = result.ObtenerNivelDetalleDeLaOperacionResult.diffgram.NewDataSet;
                        countDataDLOR = Object.keys(data).length;
                      

                        // Guardar DetalleDirecciones
                        if (data && data.Detalle_x0020_operacion) {
                            countIfdataDLOR = countIfdataDLOR + 1;
                            const detalleOperacion = Array.isArray(data.Detalle_x0020_operacion) ? data.Detalle_x0020_operacion : [data.Detalle_x0020_operacion];
                            for (let i = 0; i < detalleOperacion.length; i++) {
                                const item = detalleOperacion[i];
                                const registro = {
                                    idEQFX_IdentificacionConsultada,
                                    Concepto: handleEmptyString(item.Concepto),
                                    Valor: handleEmptyString(item.Valor)
                                };

                                console.log('Registro EQFX_DetalleOperacion:', registro);

                                try {
                                    const repository = AppDataSource.getRepository(EQFX_DetalleOperacion);
                                    await repository.save(registro);
                                    console.log('Registro guardado en EQFX_DetalleOperacion');
                                } catch (dbError) {
                                    console.error('Error al guardar el registro EQFX_DetalleOperacion:', dbError);
                                }
                            }
                        }

 

                        resolve({ countIfdataDLOR, countDataDLOR });
                    } else {
                        console.error('No se encontraron datos en la respuesta');
                        resolve({ countIfdataDLOR, countDataDLOR });
                    }
                });
            } catch (error) {
                console.error('Error al procesar la respuesta SOAP:', error);
                resolve({ countIfdataDLOR, countDataDLOR });
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
    consultarNivelDetalleDeLaOperacion
};
