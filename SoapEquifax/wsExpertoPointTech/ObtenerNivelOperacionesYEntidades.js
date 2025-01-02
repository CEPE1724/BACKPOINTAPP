const soap = require('soap');
const url = 'https://test.equifax.com.ec/wsExpertoPointTech/wsExpertoPointTech.asmx?wsdl';
const EQFX_RecursivoAnalisisOperacionesDeudaHistorica = require('../../Equifax/api/NivelDetalleOperacionesYEntidades/EQFX_RecursivoAnalisisOperacionesDeudaHistorica/model');

const consultarOperacionesDeudaHistorica = (idEQFX_IdentificacionConsultada, idReportePadre, tipoDocumento, numeroDocumento) => {
    return new Promise((resolve, reject) => {
        const args = {
            idReportePadre: idReportePadre,
            tipoDocumento: tipoDocumento,
            numeroDocumento: numeroDocumento,
            fechaCorte: new Date().toISOString().split('T')[0]  // Fecha en formato yyyy-mm-dd
        };

        console.log('args:', args);

        const usuario = 'wspointtech';
        const clave = 'burocr';

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
                'SOAPAction': 'http://www.creditreport.ec/ObtenerNivelDetalleOperacionesYEntidades'
            }
        };

        soap.createClient(url, options, (err, client) => {
            if (err) {
                console.error('Error al crear el cliente SOAP:', err);
                return reject('Error al crear el cliente SOAP');
            }

            const methodName = 'ObtenerNivelDetalleOperacionesYEntidades';
            const service = client.wsExpertoPointTech.wsExpertoPointTechSoap;

            try {
                let countOYE = 0;
                let countIfdataOYE = 0;
                client.addSoapHeader(soapHeader);

                service[methodName](args, async (err, result) => {
                    if (err) {
                        console.error('Error al realizar la solicitud SOAP:', err);
                        return reject('Error al realizar la solicitud SOAP');
                    }

                    if (result && result.ObtenerNivelDetalleOperacionesYEntidadesResult && result.ObtenerNivelDetalleOperacionesYEntidadesResult.diffgram) {
                        // Acceder a los datos del diffgram
                        const data = result.ObtenerNivelDetalleOperacionesYEntidadesResult.diffgram.NewDataSet;
                        countOYE = Object.keys(data).length;
                        if (data && data.Recursivo_x0020_analisis_x0020_operaciones_x0020_deuda_x0020_historica) {
                            countIfdataOYE = countIfdataOYE + 1;
                            const recrusivoData = Array.isArray(data.Recursivo_x0020_analisis_x0020_operaciones_x0020_deuda_x0020_historica) ? data.Recursivo_x0020_analisis_x0020_operaciones_x0020_deuda_x0020_historica : [data.Recursivo_x0020_analisis_x0020_operaciones_x0020_deuda_x0020_historica];
                            const fechacorte = item.FechaCorte ? new Date(item.FechaCorte).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
                            const fechaoperacion = item.FechaOperacion ? new Date(item.FechaOperacion).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
                            const fechacorteparam = item.FechaCorteParam ? new Date(item.FechaCorteParam).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
                            const fechainv = item.FechaInv ? new Date(item.FechaInv).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
                            const fechatablainv = item.FechaTablaInv ? new Date(item.FechaTablaInv).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
                            const registro = {
                                idEQFX_IdentificacionConsultada: idEQFX_IdentificacionConsultada,
                                FechaCorte: fechacorte,
                                Operacion: handleEmptyString(recrusivoData.Operacion),
                                FechaOperacion: fechaoperacion,
                                Institucion: handleEmptyString(recrusivoData.Institucion),
                                TipoDeudor: handleEmptyString(recrusivoData.TipoDeudor),
                                TipoCredito: handleEmptyString(recrusivoData.TipoCredito),
                                Calificacion: handleEmptyString(recrusivoData.Calificacion),
                                CalificacionHomologada: handleEmptyString(recrusivoData.CalificacionHomologada),
                                ValorTotal: handleEmpyDecimal(recrusivoData.ValorTotal),
                                ValorTotalPorVencer: handleEmpyDecimal(recrusivoData.ValorTotalPorVencer),
                                ValorTotalNdi: handleEmpyDecimal(recrusivoData.ValorTotalNdi),
                                ValorVencido0_1: handleEmpyDecimal(recrusivoData.ValorVencido0_1),
                                ValorVencido1_2: handleEmpyDecimal(recrusivoData.ValorVencido1_2),
                                ValorVencido2_3: handleEmpyDecimal(recrusivoData.ValorVencido2_3),
                                ValorVencido3_6: handleEmpyDecimal(recrusivoData.ValorVencido3_6),
                                ValorVencido6_9: handleEmpyDecimal(recrusivoData.ValorVencido6_9),
                                ValorVencido9_12: handleEmpyDecimal(recrusivoData.ValorVencido9_12),
                                ValorVencido12_24: handleEmpyDecimal(recrusivoData.ValorVencido12_24),
                                ValorVencido24_36: handleEmpyDecimal(recrusivoData.ValorVencido24_36),
                                ValorVencido36: handleEmpyDecimal(recrusivoData.ValorVencido36),
                                ValorDemandaJudicial: handleEmpyDecimal(recrusivoData.ValorDemandaJudicial),
                                ValorCarteraCastigada: handleEmpyDecimal(recrusivoData.ValorCarteraCastigada),
                                ValorVencidoInv: handleEmpyDecimal(recrusivoData.ValorVencidoInv),
                                OperacionParam: handleEmptyString(recrusivoData.OperacionParam),
                                CodigoInstitucionParam: handleEmptyInt(recrusivoData.CodigoInstitucionParam),
                                TipoDocumentoParam: handleEmptyString(recrusivoData.TipoDocumentoParam),
                                NumeroDocumentoParam: handleEmptyString(recrusivoData.NumeroDocumentoParam),
                                TipoRegistroParam: handleEmptyString(recrusivoData.TipoRegistroParam),
                                CodigoTarjetaParam: handleEmpyDecimal(recrusivoData.CodigoTarjetaParam),
                                CodigoTcParam: handleEmptyString(recrusivoData.CodigoTcParam),
                                FechaCorteParam: fechacorteparam,
                                FechaInv: fechainv,
                                CodigoTipoDeudorParam: handleEmptyString(recrusivoData.CodigoTipoDeudorParam),
                                FechaTablaInv: fechatablainv,
                                AcuerdoConcordatorio: handleEmptyString(recrusivoData.AcuerdoConcordatorio)
                            };
                            console.log('Registro:', registro);
                            try {
                                const repository = AppDataSource.getRepository(EQFX_RecursivoAnalisisOperacionesDeudaHistorica);
                                await repository.save(registro);
                                console.log('Registro guardado en EQFX_RecursivoAnalisisOperacionesDeudaHistorica');
                            } catch (dbError) {
                                console.error('Error al guardar el registro EQFX_RecursivoAnalisisOperacionesDeudaHistorica:', dbError);
                                reject('Error al guardar el registro EQFX_RecursivoAnalisisOperacionesDeudaHistorica');
                            }
                            resolve({ countIfdataOYE, countOYE });
                        }

                        } else {
                            console.error('No se encontraron datos en la respuesta');
                            resolve({ countIfdataOYE, countOYE });
                        }
                    });
            } catch (error) {
                console.error('Error al procesar la respuesta SOAP:', error);
                resolve({ countIfdata, countdata });
            }
        });
    });
};

const handleEmptyString = (value) => {
    if (value === null || value === undefined) {
        return '';  // Devuelve cadena vacía si es nulo o indefinido
    }
    if (typeof value === 'string') {
        return value.trim() === '' ? '' : value;  // Si es una cadena vacía, devuelve una cadena vacía
    }
    return '';  // Si no es una cadena, devuelve cadena vacía
};


const handleEmptyInt = (value) => {
    if (value === null || value === undefined) {
        return 0; // Devuelve 0 si es nulo o indefinido
    }

    // Si es un string, aplicamos .trim()
    if (typeof value === 'string') {
        return value.trim() === '' ? 0 : value; // Si es una cadena vacía, devuelve 0
    }

    return 0; // Si no es una cadena, devuelve 0
}

const handleEmpyDecimal = (value) => {
    if (value === null || value === undefined) {
        return 0.0; // Devuelve 0.0 si es nulo o indefinido
    }

    // Si es un string, aplicamos .trim()
    if (typeof value === 'string') {
        return value.trim() === '' ? 0.0 : value; // Si es una cadena vacía, devuelve 0.0
    }

    return 0.0; // Si no es una cadena, devuelve 0.0
}
module.exports = {
    consultarOperacionesDeudaHistorica
};
