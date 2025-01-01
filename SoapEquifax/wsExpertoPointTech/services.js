
const soap = require('soap');
const { AppDataSource } = require("../../ApiCobrador/api/config/database");
const EQFX_IdentificacionConsultada = require('../../Equifax/api/EQFX_IdentificacionConsultada/model');
const EQFX_ResultadoSegmentacion = require('../../Equifax/api/EQFX_ResultadoSegmentacion/model');
const EQFX_ResultadoPoliticas = require('../../Equifax/api/EQFX_ResultadoPoliticas/model');
const EQFX_ScorePuntajeyGraficoV3 = require('../../Equifax/api/EQFX_ScorePuntajeyGraficoV3/model');
const EQFX_EvolucionHistoricaDistEndeudamientoEducativo = require('../../Equifax/api/EQFX_EvolucionHistoricaDistEndeudamientoEducativo/model');
const EQFX_DeudaTotalSICOM = require('../../Equifax/api/EQFX_DeudaTotalSICOM/model');
const EQFX_CuotaEstimadaMensualWeb = require('../../Equifax/api/EQFX_CuotaEstimadaMensualWeb/model');
const EQFX_HistorialCrediticio = require('../../Equifax/api/EQFX_HistorialCrediticio/model');
const EQFX_PerfilRiesgoDirecto = require('../../Equifax/api/EQFX_PerfilRiesgoDirecto/model');
const EQFX_PerfilRiesgoDirectoSeis = require('../../Equifax/api/EQFX_PerfilRiesgoDirectoSeis/model');
const EQFX_EvolucionHistoricaDistEndeudamiento = require('../../Equifax/api/EQFX_EvolucionHistoricaDistEndeudamiento/model');
const EQFX_AnalisisDetalleVencido = require('../../Equifax/api/EQFX_AnalisisDetalleVencido/model');
const EQFX_EvolucionHistoricaDistEndeudamientoRecursivo = require('../../Equifax/api/EQFX_EvolucionHistoricaDistEndeudamientoRecursivo/model');
const EntidadesQueConsultaron = require('../../Equifax/api/EntidadesQueConsultaron/model');
const EQFX_IndicadoresDeudaActualSbsSicomRfr = require('../../Equifax/api/EQFX_IndicadoresDeudaActualSbsSicomRfr/model');
const EQFX_IndicaIndicadoresDeudaHistoricaInstitucionSbsSicomRfrdores = require('../../Equifax/api/EQFX_IndicaIndicadoresDeudaHistoricaInstitucionSbsSicomRfrdores/model');
const EQFX_DetalleDeudaActualReportadaSBS = require('../../Equifax/api/EQFX_DetalleDeudaActualReportadaSBS/model');
const EQFX_DetalleOperacionesVencidas = require('../../Equifax/api/EQFX_DetalleOperacionesVencidas/model');
const EQFX_DeudaReportadaINFOCOM = require('../../Equifax/api/EQFX_DeudaReportadaINFOCOM/model');
const EQFX_EvolucionHistoricaDistEndeudamientoSICOM = require('../../Equifax/api/EQFX_EvolucionHistoricaDistEndeudamientoSICOM/model');
const EQFX_DeudaReportadaRFR = require('../../Equifax/api/EQFX_DeudaReportadaRFR/model');
const EQFX_CalificaDetalleTarjetas = require('../../Equifax/api/EQFX_CalificaDetalleTarjetas/model');
const EQFX_EvolucionHistoricaDistEndeudamientoRFR = require('../../Equifax/api/EQFX_EvolucionHistoricaDistEndeudamientoRFR/model');
const EQFX_AnalisisSaldosPorVencerSistemaFinanciero = require('../../Equifax/api/EQFX_AnalisisSaldosPorVencerSistemaFinanciero/model'); 
const EQFX_InformacionPosteriorFechaCorteOperacionesCanceladas = require('../../Equifax/api/EQFX_InformacionPosteriorFechaCorteOperacionesCanceladas/model');
const EQFX_Ultimas10OperacionesCanceladas = require('../../Equifax/api/EQFX_Ultimas10OperacionesCanceladas/model');
// URL del servicio SOAP
const url = 'https://test.equifax.com.ec/wsExpertoPointTech/wsExpertoPointTech.asmx?wsdl';

const consultarExpertoPointTech = (tipoDocumento, numeroDocumento) => {
    return new Promise((resolve, reject) => {
        // Definición de los parámetros
        const args = {
            tipoDocumento: tipoDocumento,
            numeroDocumento: numeroDocumento,
            fechaNacimiento: '',
            claseHu: '',
            codHu: '',
            codVia: '',
            km: '',
            lote: '',
            mz: '',
            nomNu: '',
            nom_via: '',
            numero: '',
            parroquia: '',
            provincia: '',
            sector: '',
            status: '',
            tipoVia: '',
            ubigeo: '',
            codMz: '',
            codSector: '',
            codZona: '',
            fulladdress: '',
            canton: '',
            x: '',
            y: '',
            zona: ''
        };

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
                'SOAPAction': 'http://www.creditreport.ec/ObtenerResultadoExpertoPointTech'
            }
        };

        soap.createClient(url, options, (err, client) => {
            if (err) {
                return reject('Error al crear el cliente SOAP');
            }
            let idEQFX_IdentificacionConsultada = 0;
            try {
                // Agregar el header explícito al cliente SOAP
                client.addSoapHeader(soapHeader);

                // Hacer la solicitud al servicio SOAP
                client.ObtenerResultadoExpertoPointTech(args, async (err, result) => {
                    if (err) {
                        console.error('Error al realizar la solicitud SOAP:', err);
                        return reject('Error al realizar la solicitud SOAP');
                    }

                    // Mostrar la respuesta del servicio
                    //console.log('Respuesta SOAP:', result);
                    //console.log('Solicitud SOAP enviada:', client.lastRequest);  // Ver XML enviado
                   // console.log('Respuesta SOAP completa:', result);

                    // Acceder a los datos del resultado
                    if (result && result.ObtenerResultadoExpertoPointTechResult && result.ObtenerResultadoExpertoPointTechResult.diffgram) {
                        const data = result.ObtenerResultadoExpertoPointTechResult.diffgram.NewDataSet;
                        const respuesta = result;
                        const codigoConsulta = respuesta.codigoConsulta || '';
                        const mensaje = respuesta.mensajeError || '';
                        const countdata = Object.keys(data).length;
                        console.log('Cantidad de datos:', countdata);
                        const keys = Object.keys(data);
                        console.log('Keys:', keys);
                        return;
                        // Verificar si existe IdentificacionConsultada
                        if (data && data.IdentificacionConsultada) {
                            // Si IdentificacionConsultada es un array
                            const identificacionData = Array.isArray(data.IdentificacionConsultada) ? data.IdentificacionConsultada[0] : data.IdentificacionConsultada;

                            const registro = {
                                NombreSujeto: identificacionData.NombreSujeto || '',
                                TipoDocumento: identificacionData.TipoDocumento || '',
                                NumeroDocumento: identificacionData.NumeroDocumento || '',
                            };

                            const repository = AppDataSource.getRepository(EQFX_IdentificacionConsultada);
                            await repository.save(registro);
                           // console.log('Registro guardado:', registro);
                            idEQFX_IdentificacionConsultada = registro.idEQFX_IdentificacionConsultada;
                            //console.log('ID de IdentificacionConsultada:', idEQFX_IdentificacionConsultada);
                        }

                        // Verificar y manejar los datos de ResultadoSegmentacion
                        if (data.ResultadoSegmentacion) {
                            const dataResultadoSe = data.ResultadoSegmentacion;  // Aquí ya no es un array
                            const segmentacionRegistro = {
                                ResultadoEvaluacion: dataResultadoSe.ResultadoEvaluacion || 0,
                                SegmentacionCliente: dataResultadoSe.SegmentacionCliente || '',
                                Ingresos: dataResultadoSe.Ingresos || 0,
                                GastoHogar: dataResultadoSe.GastoHogar || 0,
                                GastoFinanciero: dataResultadoSe.GastoFinanciero || 0,
                                RangoIngresos: dataResultadoSe.RangoIngresos || '',
                                CapacidaddePago: dataResultadoSe.CapacidaddePago || 0,
                                Edad: dataResultadoSe.Edad || 0,
                                ModeloUtilizado: dataResultadoSe.ModeloUtilizado || '',
                                ScoreTitular: dataResultadoSe.ScoreTitular || '',
                                ScoreSobreendeudamiento: dataResultadoSe.ScoreSobreendeudamiento || '',
                                idEQFX_IdentificacionConsultada: idEQFX_IdentificacionConsultada
                            };
                            const repository = AppDataSource.getRepository(EQFX_ResultadoSegmentacion);
                            await repository.save(segmentacionRegistro);
                           // console.log('Datos de segmentación:', segmentacionRegistro);
                        }

                        if (data.ResultadoPoliticas) {
                            const dataResultadoPoliticas = data.ResultadoPoliticas;
                            const politicasRegistro = {
                                idEQFX_IdentificacionConsultada: idEQFX_IdentificacionConsultada,
                                Politica: dataResultadoPoliticas.Politica || '',
                                Valor: dataResultadoPoliticas.Valor || '',
                                Resultado: dataResultadoPoliticas.Resultado || ''
                            };
                            const repository = AppDataSource.getRepository(EQFX_ResultadoPoliticas);
                            await repository.save(politicasRegistro);
                            //console.log('Datos de políticas:', politicasRegistro);
                        }

                        if (data.Score_x0020_Puntaje_x0020_y_x0020_Grafico_x0020_V3_x0020__x0028_Institucion_x0029_) {
                            const dataScorePuntajeyGraficoV3 = data.Score_x0020_Puntaje_x0020_y_x0020_Grafico_x0020_V3_x0020__x0028_Institucion_x0029_;
                            const scoreRegistro = {
                                idEQFX_IdentificacionConsultada: idEQFX_IdentificacionConsultada,
                                Score: dataScorePuntajeyGraficoV3.Score || 0,
                                TotalAcum: dataScorePuntajeyGraficoV3.TotalAcum || 0,
                                TasaDeMalosAcum: dataScorePuntajeyGraficoV3.TasaDeMalosAcum || 0,
                                ScoreMin: dataScorePuntajeyGraficoV3.ScoreMin || 0,
                                ScoreMax: dataScorePuntajeyGraficoV3.ScoreMax || 0,
                                FechaInicial: dataScorePuntajeyGraficoV3.FechaInicial || new Date(),
                                FechaFinal: dataScorePuntajeyGraficoV3.FechaFinal || new Date()
                            };
                            const repository = AppDataSource.getRepository(EQFX_ScorePuntajeyGraficoV3);
                            await repository.save(scoreRegistro);
                           // console.log('Datos de ScorePuntajeyGraficoV3:', scoreRegistro);
                        }

                        if(data.Deuda_x0020_reportada_x0020_por_x0020_INFOCOM_x0020__x0028_excluyendo_x0020_IESS_x0029_){
                            const dataDeudaReportadaINFOCOM = Array.isArray(data.Deuda_x0020_reportada_x0020_por_x0020_INFOCOM_x0020__x0028_excluyendo_x0020_IESS_x0029_)
                                ? data.Deuda_x0020_reportada_x0020_por_x0020_INFOCOM_x0020__x0028_excluyendo_x0020_IESS_x0029_
                                : [data.Deuda_x0020_reportada_x0020_por_x0020_INFOCOM_x0020__x0028_excluyendo_x0020_IESS_x0029_];
                            for (let i = 0; i < dataDeudaReportadaINFOCOM.length; i++) {
                                const item = dataDeudaReportadaINFOCOM[i];
                                const deudaReportadaINFOCOMRegistro = {
                                    idEQFX_IdentificacionConsultada: idEQFX_IdentificacionConsultada,
                                    Institucion: handleEmptyString(item.Institucion),
                                    FechaCorte: item.FechaCorte || new Date(),
                                    TipoDeudor: handleEmptyString(item.TipoDeudor),
                                    Total: handleEmpyDecimal(item.Total),
                                    PorVencer: handleEmpyDecimal(item.PorVencer),
                                    NoDevengaInt: handleEmpyDecimal(item.NoDevengaInt),
                                    Vencido: handleEmpyDecimal(item.Vencido),
                                    DemandaJudicial: handleEmpyDecimal(item.DemandaJudicial),
                                    CarteraCastigada: handleEmpyDecimal(item.CarteraCastigada),
                                    DiasVencido: handleEmptyInt(item.DiasVencido),
                                    CodigoInstitucionInv: handleEmptyInt(item.CodigoInstitucionInv),
                                    CodTipoDeudorInv: handleEmptyString(item.CodTipoDeudorInv),
                                    NumeroDocumentoInv: handleEmptyString(item.NumeroDocumentoInv),
                                    NombreSujetoInv: handleEmptyString(item.NombreSujetoInv)
                                };
                               // console.log('Datos de DeudaReportadaINFOCOM:', deudaReportadaINFOCOMRegistro);
                                const repository = AppDataSource.getRepository(EQFX_DeudaReportadaINFOCOM);
                                await repository.save(deudaReportadaINFOCOMRegistro);
                            }
                        }

                        if(data.Deuda_x0020_reportada_x0020_por_x0020_RFR){
                            const dataDeudaReportadaRFR = Array.isArray(data.Deuda_x0020_reportada_x0020_por_x0020_RFR)
                                ? data.Deuda_x0020_reportada_x0020_por_x0020_RFR
                                : [data.Deuda_x0020_reportada_x0020_por_x0020_RFR];
                            for (let i = 0; i < dataDeudaReportadaRFR.length; i++) {
                                const item = dataDeudaReportadaRFR[i];
                                const fechaCorte = item.FechaCorte ? new Date(item.FechaCorte).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

                                const deudaReportadaRFRRegistro = {
                                    idEQFX_IdentificacionConsultada: idEQFX_IdentificacionConsultada,
                                    FechaCorte: fechaCorte,
                                    Institucion: handleEmptyString(item.Institucion),
                                    TipoDeudor: handleEmptyString(item.TipoDeudor),
                                    CodTipoCreditoInv: handleEmptyString(item.CodTipoCreditoInv),
                                    TipoCredito: handleEmptyString(item.TipoCredito),
                                    Calificacion: handleEmptyString(item.Calificacion),
                                    PorVencer: handleEmpyDecimal(item.PorVencer),
                                    NoDevengaInt: handleEmpyDecimal(item.NoDevengaInt),
                                    Vencido: handleEmpyDecimal(item.Vencido),
                                    DemandaJudicial: handleEmpyDecimal(item.DemandaJudicial),
                                    CarteraCastigada: handleEmpyDecimal(item.CarteraCastigada),
                                    Total: handleEmpyDecimal(item.Total),
                                    DiasVencido: handleEmptyInt(item.DiasVencido),
                                    MayorPlazoVencidoInv: handleEmptyString(item.MayorPlazoVencidoInv),
                                    SaldoTotalInv: handleEmpyDecimal(item.SaldoTotalInv),
                                    CodTipoDeudorInv: handleEmptyString(item.CodTipoDeudorInv),
                                    NumeroDocumentoInv: handleEmptyString(item.NumeroDocumentoInv),
                                    NombreSujetoInv: handleEmptyString(item.NombreSujetoInv),
                                    CodigoInstitucionInv: handleEmptyInt(item.CodigoInstitucionInv)
                                };
                                console.log('Datos de DeudaReportadaRFR:', deudaReportadaRFRRegistro);
                                const repository = AppDataSource.getRepository(EQFX_DeudaReportadaRFR);
                                await repository.save(deudaReportadaRFRRegistro);
                            }
                        }    
                        
                        if(data.Evolucion_x0020_Historica_x0020_y_x0020_Dist_x0020_Endeudamiento_x0020_RFR){
                            const dataEvolucionHistoricaDistEndeudamientoRFR = Array.isArray(data.Evolucion_x0020_Historica_x0020_y_x0020_Dist_x0020_Endeudamiento_x0020_RFR)
                                ? data.Evolucion_x0020_Historica_x0020_y_x0020_Dist_x0020_Endeudamiento_x0020_RFR
                                : [data.Evolucion_x0020_Historica_x0020_y_x0020_Dist_x0020_Endeudamiento_x0020_RFR];
                            for (let i = 0; i < dataEvolucionHistoricaDistEndeudamientoRFR.length; i++) {
                                const item = dataEvolucionHistoricaDistEndeudamientoRFR[i];
                                const evolucionRegistro = {
                                    idEQFX_IdentificacionConsultada: idEQFX_IdentificacionConsultada,
                                    FechaCorte: handleEmptyString(item.FechaCorte),
                                    NOM_INSTITUCION: handleEmptyString(item.NOM_INSTITUCION),
                                    NOM_TIPO_CRED: handleEmptyString(item.NOM_TIPO_CRED),
                                    TIPO_DEUDOR: handleEmptyString(item.TIPO_DEUDOR),
                                    COD_CALIFICACION_ORIGEN: handleEmptyString(item.COD_CALIFICACION_ORIGEN),
                                    VAL_X_VENCER: handleEmpyDecimal(item.VAL_X_VENCER),
                                    VAL_VENCIDO: handleEmpyDecimal(item.VAL_VENCIDO),
                                    VAL_NDI: handleEmpyDecimal(item.VAL_NDI),
                                    VAL_DEM_JUDICIAL: handleEmpyDecimal(item.VAL_DEM_JUDICIAL),
                                    VAL_CART_CASTIGADA: handleEmpyDecimal(item.VAL_CART_CASTIGADA),
                                    NUM_DIAS_VENCIDO_ACTUALIZADO: handleEmptyInt(item.NUM_DIAS_VENCIDO_ACTUALIZADO)
                                };
                                console.log('Datos de EvolucionHistoricaDistEndeudamientoRFR:', evolucionRegistro);
                                const repository = AppDataSource.getRepository(EQFX_EvolucionHistoricaDistEndeudamientoRFR);
                                await repository.save(evolucionRegistro);
                            }
                        }                   

                        if(data.Evolucion_x0020_Historica_x0020_y_x0020_Dist_x0020_Endeudamiento_x0020_SICOM){
                            const dataEvolucionHistoricaDistEndeudamientoSICOM = Array.isArray(data.Evolucion_x0020_Historica_x0020_y_x0020_Dist_x0020_Endeudamiento_x0020_SICOM)
                                ? data.Evolucion_x0020_Historica_x0020_y_x0020_Dist_x0020_Endeudamiento_x0020_SICOM
                                : [data.Evolucion_x0020_Historica_x0020_y_x0020_Dist_x0020_Endeudamiento_x0020_SICOM];
                            for (let i = 0; i < dataEvolucionHistoricaDistEndeudamientoSICOM.length; i++) {
                                const item = dataEvolucionHistoricaDistEndeudamientoSICOM[i];
                                const evolucionRegistro = {
                                    idEQFX_IdentificacionConsultada: idEQFX_IdentificacionConsultada,
                                    FechaCorte: item.FechaCorte || new Date(),
                                    NOM_INSTITUCION: handleEmptyString(item.NOM_INSTITUCION),
                                    TIPO_DEUDOR: handleEmptyString(item.TIPO_DEUDOR),
                                    VAL_X_VENCER: handleEmpyDecimal(item.VAL_X_VENCER),
                                    VAL_VENCIDO: handleEmpyDecimal(item.VAL_VENCIDO),
                                    VAL_NDI: handleEmpyDecimal(item.VAL_NDI),
                                    VAL_DEM_JUDICIAL: handleEmpyDecimal(item.VAL_DEM_JUDICIAL),
                                    VAL_CART_CASTIGADA: handleEmpyDecimal(item.VAL_CART_CASTIGADA),
                                    NUM_DIAS_VENCIDO_ACTUALIZADO: handleEmptyInt(item.NUM_DIAS_VENCIDO_ACTUALIZADO)
                                };
                                console.log('Datos de EvolucionHistoricaDistEndeudamientoSICOM:', evolucionRegistro);
                                const repository = AppDataSource.getRepository(EQFX_EvolucionHistoricaDistEndeudamientoSICOM);
                                await repository.save(evolucionRegistro);
                            }
                        }

                        if (data.Recursivo_x0020_Detalle_x0020_distribucion_x0020_endeudamiento_x0020_Educativo) {
                            // Asegurarse de que es un array (si no lo es, conviértelo a uno)
                            const dataEvolucionHistoricaDistEndeudamientoEducativo = Array.isArray(data.Recursivo_x0020_Detalle_x0020_distribucion_x0020_endeudamiento_x0020_Educativo)
                                ? data.Recursivo_x0020_Detalle_x0020_distribucion_x0020_endeudamiento_x0020_Educativo
                                : [data.Recursivo_x0020_Detalle_x0020_distribucion_x0020_endeudamiento_x0020_Educativo];

                            // Recorrer todos los elementos del array
                            for (let i = 0; i < dataEvolucionHistoricaDistEndeudamientoEducativo.length; i++) {
                                const item = dataEvolucionHistoricaDistEndeudamientoEducativo[i];
                                // Función para asegurarse de que un valor sea una cadena vacía si está vacío
                               
                                // Crear el registro para cada elemento
                                const evolucionRegistro = {
                                    idEQFX_IdentificacionConsultada: idEQFX_IdentificacionConsultada,
                                    FechaCorte: item.FechaCorte || new Date(),
                                    FechaCorteParam: item.FechaCorteParam || new Date(),
                                    CodigoInstitucionParam: item.CodigoInstitucionParam || 0,
                                    Institucion: item.Institucion || '',
                                    TipoCreditoParam: handleEmptyString(item.TipoCreditoParam),
                                    TipoCredito: handleEmptyString(item.TipoCredito),
                                    SaldoDeuda: item.SaldoDeuda || 0,
                                    DemandaJudicial: item.DemandaJudicial || 0,
                                    CarteraCastigada: item.CarteraCastigada || 0,
                                    Titular: item.Titular || 0,
                                    Garante: item.Garante || 0,
                                    Codeudor: item.Codeudor || 0,
                                    TarjetaCredito: item.TarjetaCredito || 0,
                                    AcuerdoAcuerdoConcordatorio: handleEmptyString(item.AcuerdoConcordatorio),
                                    Detalle: handleEmptyString(item.Detalle), 
                                    Concordatorio: handleEmptyString(item.Concordatorio),
                                    Detalle: handleEmptyString(item.Detalle),
                                    ResaltadaInv: handleEmptyString(item.ResaltadaInv)
                                };
                                console.log('Datos de EvolucionHistoricaDistEndeudamientoEducativo:', evolucionRegistro);

                                // Guardar en la base de datos
                                const repository = AppDataSource.getRepository(EQFX_EvolucionHistoricaDistEndeudamientoEducativo);
                                await repository.save(evolucionRegistro);
                            }
                        }
                        
                        if( data.Valor_x0020_deuda_x0020_total_x0020_en_x0020_los_x0020_3_x0020_segmentos_x0020_SIN_x0020_IESS){
                            const dataDeudaTotalSICOM = Array.isArray(data.Valor_x0020_deuda_x0020_total_x0020_en_x0020_los_x0020_3_x0020_segmentos_x0020_SIN_x0020_IESS)
                                ? data.Valor_x0020_deuda_x0020_total_x0020_en_x0020_los_x0020_3_x0020_segmentos_x0020_SIN_x0020_IESS
                                : [data.Valor_x0020_deuda_x0020_total_x0020_en_x0020_los_x0020_3_x0020_segmentos_x0020_SIN_x0020_IESS];
                            for (let i = 0; i < dataDeudaTotalSICOM.length; i++) {
                                const item = dataDeudaTotalSICOM[i];
                                const deudaTotalSICOMRegistro = {
                                    idEQFX_IdentificacionConsultada: idEQFX_IdentificacionConsultada,
                                    Titulo: handleEmptyString(item.Titulo),
                                    TituloWSInv: handleEmptyString(item.TituloWSInv),
                                    PorVencer: handleEmpyDecimal(item.PorVencer),
                                    NoDevengaInt: handleEmpyDecimal(item.NoDevengaInt),
                                    Vencido: handleEmpyDecimal(item.Vencido),
                                    Total: handleEmpyDecimal(item.Total),
                                    DemandaJudicial: handleEmpyDecimal(item.DemandaJudicial),
                                    CarteraCastigada: handleEmpyDecimal(item.CarteraCastigada)
                                };
                                console.log('Datos de DeudaTotalSICOM:', deudaTotalSICOMRegistro);
                                const repository = AppDataSource.getRepository(EQFX_DeudaTotalSICOM);
                                await repository.save(deudaTotalSICOMRegistro);
                            }
                        }

                        if( data.Cuota_x0020_estimada_x0020_Mensual_x0020_Web){
                            const dataCuotaEstimadaMensualWeb = Array.isArray(data.Cuota_x0020_estimada_x0020_Mensual_x0020_Web)
                                ? data.Cuota_x0020_estimada_x0020_Mensual_x0020_Web 
                                : [data.Cuota_x0020_estimada_x0020_Mensual_x0020_Web];
                            for (let i = 0; i < dataCuotaEstimadaMensualWeb.length; i++) {
                                const item = dataCuotaEstimadaMensualWeb[i];
                                const cuotaEstimadaMensualWebRegistro = {
                                    idEQFX_IdentificacionConsultada: idEQFX_IdentificacionConsultada,
                                    Pago : handleEmpyDecimal(item.Pago),
                                    NumeroCreditosComercial : handleEmptyInt(item.NumeroCreditosComercial),
                                    TotalVencido : handleEmpyDecimal(item.TotalVencido),
                                    TotalDemanda: handleEmpyDecimal(item.TotalDemanda),
                                    TotalCartera : handleEmpyDecimal(item.TotalCartera),
                                    NumeroCreditosIece : handleEmptyInt(item.NumeroCreditosIece),
                                    NumeroOperacionesExcluidas : handleEmptyInt(item.NumeroOperacionesExcluidas)
                                };
                                console.log('Datos de CuotaEstimadaMensualWeb:', cuotaEstimadaMensualWebRegistro);
                                const repository = AppDataSource.getRepository(EQFX_CuotaEstimadaMensualWeb);
                                await repository.save(cuotaEstimadaMensualWebRegistro);
                            }
                        }

                        if( data.Mantiene_x0020_historial_x0020_crediticio_x0020_desde){
                             const dataHistorialCrediticio = Array.isArray(data.Mantiene_x0020_historial_x0020_crediticio_x0020_desde)
                                ? data.Mantiene_x0020_historial_x0020_crediticio_x0020_desde
                                : [data.Mantiene_x0020_historial_x0020_crediticio_x0020_desde];
                            for (let i = 0; i < dataHistorialCrediticio.length; i++) {
                                const item = dataHistorialCrediticio[i];
                                const historialCrediticioRegistro = {
                                    idEQFX_IdentificacionConsultada: idEQFX_IdentificacionConsultada,
                                    Titulo: handleEmptyString(item.Titulo),
                                    PrimeraFecha: item.PrimeraFecha || new Date()
                                };
                                console.log('Datos de HistorialCrediticio:', historialCrediticioRegistro);
                                const repository = AppDataSource.getRepository(EQFX_HistorialCrediticio);
                                await repository.save(historialCrediticioRegistro);
                            }
                        }

                        if( data.Identificador_x0020_perfil_x0020_riesgo_x0020_directo_x0020_desde_x0020_20051){
                            const dataPerfilRiesgoDirecto = Array.isArray(data.Identificador_x0020_perfil_x0020_riesgo_x0020_directo_x0020_desde_x0020_20051)
                                ? data.Identificador_x0020_perfil_x0020_riesgo_x0020_directo_x0020_desde_x0020_20051
                                : [data.Identificador_x0020_perfil_x0020_riesgo_x0020_directo_x0020_desde_x0020_20051];
                            for (let i = 0; i < dataPerfilRiesgoDirecto.length; i++) {
                                const item = dataPerfilRiesgoDirecto[i];
                                const perfilRiesgoDirectoRegistro = {
                                    idEQFX_IdentificacionConsultada: idEQFX_IdentificacionConsultada,
                                    Indicador : handleEmptyString(item.Indicador),
                                    Valor : handleEmpyDecimal(item.Valor),
                                    Fecha : item.Fecha || new Date()
                                };
                                console.log('Datos de PerfilRiesgoDirecto:', perfilRiesgoDirectoRegistro);
                                const repository = AppDataSource.getRepository(EQFX_PerfilRiesgoDirecto);
                                await repository.save(perfilRiesgoDirectoRegistro);
                            }
                        }

                        if(data.Identificador_x0020_perfil_x0020_riesgo_x0020_directo_x0020_6_x0020_meses2){
                            const dataPerfilRiesgoDirectoSeis = Array.isArray(data.Identificador_x0020_perfil_x0020_riesgo_x0020_directo_x0020_6_x0020_meses2)
                                ? data.Identificador_x0020_perfil_x0020_riesgo_x0020_directo_x0020_6_x0020_meses2
                                : [data.Identificador_x0020_perfil_x0020_riesgo_x0020_directo_x0020_6_x0020_meses2];
                            for (let i = 0; i < dataPerfilRiesgoDirectoSeis.length; i++) {
                                const item = dataPerfilRiesgoDirectoSeis[i];
                                const perfilRiesgoDirectoSeisRegistro = {
                                    idEQFX_IdentificacionConsultada: idEQFX_IdentificacionConsultada,
                                    Indicador : handleEmptyString(item.Indicador),
                                    Valor : handleEmpyDecimal(item.Valor),
                                    Fecha : item.Fecha || new Date()
                                };
                                console.log('Datos de PerfilRiesgoDirectoSeis:', perfilRiesgoDirectoSeisRegistro);
                                const repository = AppDataSource.getRepository(EQFX_PerfilRiesgoDirectoSeis);
                                await repository.save(perfilRiesgoDirectoSeisRegistro);
                            }
                        }

                        if(data.Recursivo_x0020_Composicion_x0020_estructura_x0020_de_x0020_vencimiento){
                            const dataEvolucionHistoricaDistEndeudamiento = Array.isArray(data.Recursivo_x0020_Composicion_x0020_estructura_x0020_de_x0020_vencimiento)
                                ? data.Recursivo_x0020_Composicion_x0020_estructura_x0020_de_x0020_vencimiento
                                : [data.Recursivo_x0020_Composicion_x0020_estructura_x0020_de_x0020_vencimiento];
                            for (let i = 0; i < dataEvolucionHistoricaDistEndeudamiento.length; i++) {
                                const item = dataEvolucionHistoricaDistEndeudamiento[i];
                                const evolucionRegistro = {
                                    idEQFX_IdentificacionConsultada: idEQFX_IdentificacionConsultada,
                                    FechaCorte: item.FechaCorte || new Date(),
                                    Institucion: handleEmptyString(item.Institucion),
                                    PorVencer: handleEmpyDecimal(item.PorVencer),
                                    Vencido: handleEmpyDecimal(item.Vencido),
                                    NoDevengaInt: handleEmpyDecimal(item.NoDevengaInt),
                                    SaldoDeuda: handleEmpyDecimal(item.SaldoDeuda),
                                    DemandaJudicial: handleEmpyDecimal(item.DemandaJudicial),
                                    CarteraCastigada: handleEmpyDecimal(item.CarteraCastigada),
                                    CodigoInstitucionParam: handleEmptyInt(item.CodigoInstitucionParam),
                                    AcuerdoConcordatorio: handleEmptyString(item.AcuerdoConcordatorio),
                                    InstitucionParam: handleEmptyString(item.InstitucionParam)

                                };
                                console.log('Datos de EvolucionHistoricaDistEndeudamiento:', evolucionRegistro);
                                const repository = AppDataSource.getRepository(EQFX_EvolucionHistoricaDistEndeudamiento);
                                await repository.save(evolucionRegistro);
                            }
                        }

                        if (data.Analisis_x0020_detalle_x0020_del_x0020_vencido){
                            const dataAnalisisDetalleVencido = Array.isArray(data.Analisis_x0020_detalle_x0020_del_x0020_vencido)
                                ? data.Analisis_x0020_detalle_x0020_del_x0020_vencido
                                : [data.Analisis_x0020_detalle_x0020_del_x0020_vencido];
                            for (let i = 0; i < dataAnalisisDetalleVencido.length; i++) {
                                const item = dataAnalisisDetalleVencido[i];
                                const analisisDetalleVencidoRegistro = {
                                    idEQFX_IdentificacionConsultada: idEQFX_IdentificacionConsultada,
                                    FechaCorte: item.FechaCorte || new Date(),
                                    Institucion: handleEmptyString(item.Institucion),
                                    Vencido0a1: handleEmpyDecimal(item.Vencido0a1),
                                    Vencido1a2: handleEmpyDecimal(item.Vencido1a2),
                                    Vencido2a3: handleEmpyDecimal(item.Vencido2a3),
                                    Vencido3a6: handleEmpyDecimal(item.Vencido3a6),
                                    Vencido6a9: handleEmpyDecimal(item.Vencido6a9),
                                    Vencido9a12: handleEmpyDecimal(item.Vencido9a12),
                                    Vencido12a24: handleEmpyDecimal(item.Vencido12a24),
                                    Vencido24a36: handleEmpyDecimal(item.Vencido24a36),
                                    Vencido36: handleEmpyDecimal(item.Vencido36),
                                    DemandaJudicial: handleEmpyDecimal(item.DemandaJudicial),
                                    CarteraCastigada: handleEmpyDecimal(item.CarteraCastigada),
                                    NoDevengaInteresesInv: handleEmpyDecimal(item.NoDevengaInteresesInv),
                                    TotalVencidoInv: handleEmpyDecimal(item.TotalVencidoInv),
                                    AcuerdoConcordato: handleEmptyString(item.AcuerdoConcordato)
                                };
                                console.log('Datos de AnalisisDetalleVencido:', analisisDetalleVencidoRegistro);
                                const repository = AppDataSource.getRepository(EQFX_AnalisisDetalleVencido);
                                await repository.save(analisisDetalleVencidoRegistro);
                            }
                        }

                        if(data.Recursivo_x0020_deuda_x0020_historica1)
                        {
                            const dataEvolucionHistoricaDistEndeudamientoRecursivo = Array.isArray(data.Recursivo_x0020_deuda_x0020_historica1)
                                ? data.Recursivo_x0020_deuda_x0020_historica1
                                : [data.Recursivo_x0020_deuda_x0020_historica1];
                            for (let i = 0; i < dataEvolucionHistoricaDistEndeudamientoRecursivo.length; i++) {
                                const item = dataEvolucionHistoricaDistEndeudamientoRecursivo[i];
                                const evolucionRegistro = {
                                    idEQFX_IdentificacionConsultada: idEQFX_IdentificacionConsultada,
                                    FechaCorte: item.FechaCorte || new Date(),
                                    FechaCorteParam: item.FechaCorteParam || new Date(),
                                    PorVencer: handleEmpyDecimal(item.PorVencer),
                                    NoDevengaInt: handleEmpyDecimal(item.NoDevengaInt),
                                    Vencido0a1 : handleEmpyDecimal(item.Vencido0a1),
                                    Vencido1a2 : handleEmpyDecimal(item.Vencido1a2),
                                    Vencido2a3 : handleEmpyDecimal(item.Vencido2a3),
                                    Vencido3a6 : handleEmpyDecimal(item.Vencido3a6),
                                    Vencido6a9 : handleEmpyDecimal(item.Vencido6a9),
                                    Vencido9a12 : handleEmpyDecimal(item.Vencido9a12),
                                    Vencido12a24 : handleEmpyDecimal(item.Vencido12a24),
                                    Vencido24 : handleEmpyDecimal(item.Vencido24),
                                    Vencido36 : handleEmpyDecimal(item.Vencido36),
                                    DemandaJudicial : handleEmpyDecimal(item.DemandaJudicial),
                                    CarteraCastigada : handleEmpyDecimal(item.CarteraCastigada),
                                    SaldoDeuda : handleEmpyDecimal(item.SaldoDeuda),
                                    tipoDeudaParam : handleEmptyString(item.tipoDeudaParam)
                                };
                                console.log('Datos de EvolucionHistoricaDistEndeudamientoRecursivo:', evolucionRegistro);
                                const repository = AppDataSource.getRepository(EQFX_EvolucionHistoricaDistEndeudamientoRecursivo);
                                await repository.save(evolucionRegistro);
                            }
                        }
                        
                        if(data.Entidades_x0020_que_x0020_han_x0020_consultado)
                        {
                            const dataEntidadesQueConsultaron = Array.isArray(data.Entidades_x0020_que_x0020_han_x0020_consultado)
                                ? data.Entidades_x0020_que_x0020_han_x0020_consultado
                                : [data.Entidades_x0020_que_x0020_han_x0020_consultado];
                            for (let i = 0; i < dataEntidadesQueConsultaron.length; i++) {
                                const item = dataEntidadesQueConsultaron[i];
                                const entidadesQueConsultaronRegistro = {
                                    idEQFX_IdentificacionConsultada: idEQFX_IdentificacionConsultada,
                                    NombreCliente: handleEmptyString(item.NombreCliente),
                                    Mes1: handleEmptyString(item.Mes1),
                                    Mes2: handleEmptyString(item.Mes2),
                                    Mes3: handleEmptyString(item.Mes3),
                                    Mes4: handleEmptyString(item.Mes4),
                                    Mes5: handleEmptyString(item.Mes5),
                                    Mes6: handleEmptyString(item.Mes6),
                                    Mes7: handleEmptyString(item.Mes7),
                                    Mes8: handleEmptyString(item.Mes8),
                                    Mes9: handleEmptyString(item.Mes9),
                                    Mes10: handleEmptyString(item.Mes10),
                                    Mes11: handleEmptyString(item.Mes11),
                                    Mes12: handleEmptyString(item.Mes12),
                                    ResaltadaInv: handleEmptyString(item.ResaltadaInv)
                                };
                                console.log('Datos de EntidadesQueConsultaron:', entidadesQueConsultaronRegistro);
                                const repository = AppDataSource.getRepository(EntidadesQueConsultaron);
                                await repository.save(entidadesQueConsultaronRegistro);
                            }
                        }

                        if(data.Indicadores_x0020_DeudaActual_x0020_SbsSicomRfr)
                        {
                            const dataIndicadoresDeudaActualSbsSicomRfr = Array.isArray(data.Indicadores_x0020_DeudaActual_x0020_SbsSicomRfr)
                                ? data.Indicadores_x0020_DeudaActual_x0020_SbsSicomRfr
                                : [data.Indicadores_x0020_DeudaActual_x0020_SbsSicomRfr];
                            for (let i = 0; i < dataIndicadoresDeudaActualSbsSicomRfr.length; i++) {
                                const item = dataIndicadoresDeudaActualSbsSicomRfr[i];
                                const indicadoresDeudaActualSbsSicomRfrRegistro = {
                                    idEQFX_IdentificacionConsultada: idEQFX_IdentificacionConsultada,
                                    FechaCorte: handleEmptyString(item.FechaCorte),
                                    Segmento: handleEmptyString(item.Segmento),
                                    Institucion: handleEmptyString(item.Institucion),
                                    TipoDeudor: handleEmptyString(item.TipoDeudor),
                                    TipoCredito: handleEmptyString(item.TipoCredito),
                                    Calificacion: handleEmptyString(item.Calificacion),
                                    PorVencer: handleEmpyDecimal(item.PorVencer),
                                    NoDevengaInt: handleEmpyDecimal(item.NoDevengaInt),
                                    Vencido: handleEmpyDecimal(item.Vencido),
                                    DemandaJudicial: handleEmpyDecimal(item.DemandaJudicial),
                                    CarteraCastigada: handleEmpyDecimal(item.CarteraCastigada),
                                    Total: handleEmpyDecimal(item.Total),
                                    DiasVencido: handleEmptyString(item.DiasVencido)
                                };
                                console.log('Datos de IndicadoresDeudaActualSbsSicomRfr:', indicadoresDeudaActualSbsSicomRfrRegistro);
                                const repository = AppDataSource.getRepository(EQFX_IndicadoresDeudaActualSbsSicomRfr);
                                await repository.save(indicadoresDeudaActualSbsSicomRfrRegistro);
                            }
                        }

                        if(data.Indicadores_x0020_DeudaHistorica_x0020_por_x0020_Institucion_x0020_Sbs_x0020_Sicom_x0020_Rfr)
                        {
                            const dataIndicadoresDeudaHistoricaInstitucionSbsSicomRfrdores = Array.isArray(data.Indicadores_x0020_DeudaHistorica_x0020_por_x0020_Institucion_x0020_Sbs_x0020_Sicom_x0020_Rfr)
                                ? data.Indicadores_x0020_DeudaHistorica_x0020_por_x0020_Institucion_x0020_Sbs_x0020_Sicom_x0020_Rfr
                                : [data.Indicadores_x0020_DeudaHistorica_x0020_por_x0020_Institucion_x0020_Sbs_x0020_Sicom_x0020_Rfr];
                            for (let i = 0; i < dataIndicadoresDeudaHistoricaInstitucionSbsSicomRfrdores.length; i++) {
                                const item = dataIndicadoresDeudaHistoricaInstitucionSbsSicomRfrdores[i];
                                const indicadoresDeudaHistoricaInstitucionSbsSicomRfrdoresRegistro = {
                                    idEQFX_IdentificacionConsultada: idEQFX_IdentificacionConsultada,
                                    FechaCorte: handleEmptyString(item.FechaCorte),
                                    Segmento: handleEmptyString(item.Segmento),
                                    Institucion: handleEmptyString(item.Institucion),
                                    TipoRiesgo: handleEmptyString(item.TipoRiesgo),
                                    TipoCredito: handleEmptyString(item.TipoCredito),
                                    Calificacion: handleEmptyString(item.Calificacion),
                                    MayorValorVencido : handleEmpyDecimal(item.MayorValorVencido),
                                    FechaMayorValor : handleEmptyString(item.FechaMayorValor),
                                    MayorPlazoVencido : handleEmptyString(item.MayorPlazoVencido),
                                    FechaMayorPlazo : handleEmptyString(item.FechaMayorPlazo),
                                    FechaUltimoVencido : handleEmptyString(item.FechaUltimoVencido),
                                    Operacion : handleEmptyString(item.Operacion)
                                };
                                console.log('Datos de IndicadoresDeudaHistoricaInstitucionSbsSicomRfrdores:', indicadoresDeudaHistoricaInstitucionSbsSicomRfrdoresRegistro);
                                const repository = AppDataSource.getRepository(EQFX_IndicaIndicadoresDeudaHistoricaInstitucionSbsSicomRfrdores);
                                await repository.save(indicadoresDeudaHistoricaInstitucionSbsSicomRfrdoresRegistro);
                            }
                        }

                        if (data.DetalleDeudaActualReportadaSBS) {
                            const dataDetalleDeudaActualReportadaSBS = Array.isArray(data.DetalleDeudaActualReportadaSBS)
                                ? data.DetalleDeudaActualReportadaSBS
                                : [data.DetalleDeudaActualReportadaSBS];
                            
                            for (let i = 0; i < dataDetalleDeudaActualReportadaSBS.length; i++) {
                                const item = dataDetalleDeudaActualReportadaSBS[i];
                                const detalleDeudaActualReportadaSBSRegistro = {
                                    idEQFX_IdentificacionConsultada: idEQFX_IdentificacionConsultada,
                                    Institucion: handleEmptyString(item.Institucion),
                                    FechaCorte: handleEmptyString(item.Fecha_x0020_de_x0020_Corte),
                                    TipoRiesgo: handleEmptyString(item.Tipo_x0020_Riesgo),
                                    TipoCredito: handleEmptyString(item.Tipo_x0020_Credito),
                                    CupoMontoOriginal: handleEmpyDecimal(item.Cupo_x0020__x002F__x0020_Monto_x0020_Original),
                                    FechaApertura: handleEmptyString(item.Fecha_x0020_de_x0020_Apertura),
                                    FechaVencimiento: handleEmptyString(item.Fecha_x0020_de_x0020_Vencimiento),
                                    CalifPropia: handleEmptyString (item["Calif._x0020_Propia"]),
                                    TotalVencer: handleEmpyDecimal(item.Total_x0020_Vencer),
                                    NDI: handleEmptyString(item.NDI),
                                    TotalVencido: handleEmpyDecimal(item.Total_x0020_Vencido),
                                    DemJud: handleEmpyDecimal(item["Dem._x0020_Jud."]),
                                    CartCast: handleEmpyDecimal(item["Cart._x0020_Cast."]),
                                    SaldoDeuda: handleEmpyDecimal(item.Saldo_x0020_Deuda),
                                    CuotaMensual: handleEmpyDecimal(item.Cuota_x0020_Mensual)
                                };
                        
                                console.log('Datos de DetalleDeudaActualReportadaSBS:', detalleDeudaActualReportadaSBSRegistro);
                                
                                const repository = AppDataSource.getRepository(EQFX_DetalleDeudaActualReportadaSBS);
                                await repository.save(detalleDeudaActualReportadaSBSRegistro);
                            }
                        }

                        if(data.Califica_x0020_Detalle_x0020_de_x0020_tarjetas)
                        {
                            const dataCalificaDetalleTarjetas = Array.isArray(data.Califica_x0020_Detalle_x0020_de_x0020_tarjetas)
                                ? data.Califica_x0020_Detalle_x0020_de_x0020_tarjetas
                                : [data.Califica_x0020_Detalle_x0020_de_x0020_tarjetas];
                            for (let i = 0; i < dataCalificaDetalleTarjetas.length; i++) {
                                const item = dataCalificaDetalleTarjetas[i];
                                const calificaDetalleTarjetasRegistro = {
                                    idEQFX_IdentificacionConsultada: idEQFX_IdentificacionConsultada,
                                    Institucion: handleEmptyString(item.Institucion),
                                    Emisor : handleEmptyString(item.Emisor),
                                    Antiguedad : handleEmptyInt(item.Antiguedad),
                                    Cupo : handleEmpyDecimal(item.Cupo),
                                    SaldoActual : handleEmpyDecimal(item.SaldoActual),
                                    SaldoPromedioUltimos6Meses : handleEmpyDecimal(item.SaldoPromedioUltimos6Meses),
                                    PorcentajeUsoTarjeta : handleEmpyDecimal(item.PorcentajeUsoTarjeta),   
                                    PorcentajeRelacionDeudaTCDeudaTotal : handleEmpyDecimal(item.PorcentajeRelacionDeudaTCDeudaTotal),
                                    NumeroTarjetaInv : handleEmptyString(item.NumeroTarjetaInv)
                                };
                                console.log('Datos de CalificaDetalleTarjetas:', calificaDetalleTarjetasRegistro);
                                const repository = AppDataSource.getRepository(EQFX_CalificaDetalleTarjetas);
                                await repository.save(calificaDetalleTarjetasRegistro);
                            }
                        }
                        
                        if(data.Analisis_x0020_saldos_x0020_por_x0020_vencer_x0020_sistema_x0020_financiero)
                        {
                            const dataAnalisisSaldosPorVencerSistemaFinanciero = Array.isArray(data.Analisis_x0020_saldos_x0020_por_x0020_vencer_x0020_sistema_x0020_financiero)
                                ? data.Analisis_x0020_saldos_x0020_por_x0020_vencer_x0020_sistema_x0020_financiero
                                : [data.Analisis_x0020_saldos_x0020_por_x0020_vencer_x0020_sistema_x0020_financiero];
                            for (let i = 0; i < dataAnalisisSaldosPorVencerSistemaFinanciero.length; i++) {
                                const item = dataAnalisisSaldosPorVencerSistemaFinanciero[i];
                                const fechaCorte = item.FechaCorte ? new Date(item.FechaCorte).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

                                const analisisSaldosPorVencerSistemaFinancieroRegistro = {
                                    idEQFX_IdentificacionConsultada: idEQFX_IdentificacionConsultada,
                                    FechaCorte: fechaCorte,
                                    Institucion: handleEmptyString(item.Institucion),
                                    CodigoInstitucionInv : handleEmpyDecimal(item.CodigoInstitucionInv),
                                    TotalPorVencer : handleEmpyDecimal(item.TotalPorVencer),
                                    PorVencer0a1 : handleEmpyDecimal(item.PorVencer0a1),
                                    PorVencer1a3 : handleEmpyDecimal(item.PorVencer1a3),
                                    PorVencer3a6 : handleEmpyDecimal(item.PorVencer3a6),
                                    PorVencer6a12 : handleEmpyDecimal(item.PorVencer6a12),
                                    PorVencer12 : handleEmpyDecimal(item.PorVencer12)
                                };
                                console.log('Datos de AnalisisSaldosPorVencerSistemaFinanciero:', analisisSaldosPorVencerSistemaFinancieroRegistro);
                                const repository = AppDataSource.getRepository(EQFX_AnalisisSaldosPorVencerSistemaFinanciero);
                                await repository.save(analisisSaldosPorVencerSistemaFinancieroRegistro);
                            }
                        }

                        if(data.Ultimas_x0020_10_x0020_operaciones_x0020_canceladas)
                        {
                            const dataUltimasOperacionesCanceladas = Array.isArray(data.Ultimas_x0020_10_x0020_operaciones_x0020_canceladas)
                                ? data.Ultimas_x0020_10_x0020_operaciones_x0020_canceladas
                                : [data.Ultimas_x0020_10_x0020_operaciones_x0020_canceladas];
                            for (let i = 0; i < dataUltimasOperacionesCanceladas.length; i++) {
                                const item = dataUltimasOperacionesCanceladas[i];
                                fechaCancelacion = item.FechaCancelacion ? new Date(item.FechaCancelacion).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
                                const ultimasOperacionesCanceladasRegistro = {
                                    idEQFX_IdentificacionConsultada: idEQFX_IdentificacionConsultada,
                                    CodigoInstitucionInv : handleEmpyDecimal(item.CodigoInstitucionInv),
                                    Institucion: handleEmptyString(item.Institucion),
                                    NumeroOperaciones : handleEmptyString(item.NumeroOperaciones),
                                    ValorOriginal : handleEmpyDecimal(item.ValorOriginal),
                                    CodFormaCancelacionInv : handleEmptyString(item.CodFormaCancelacionInv),
                                    FormaCancelacion : handleEmptyString(item.FormaCancelacion),
                                    FechaCancelacion : fechaCancelacion
                                };
                                console.log('Datos de UltimasOperacionesCanceladas:', ultimasOperacionesCanceladasRegistro);
                                const repository = AppDataSource.getRepository(EQFX_Ultimas10OperacionesCanceladas);
                                await repository.save(ultimasOperacionesCanceladasRegistro);
                            }
                        }
                        
                        if (data["Información_x0020_posterior_x0020_a_x0020_Fecha_x0020_de_x0020_Corte_x0020_-_x0020_Operaciones_x0020_Canceladas"]) {
                            // Asegúrate de procesar la data aquí
                            const dataInformacionPosteriorFechaCorteOperacionesCanceladas = Array.isArray(data["Información_x0020_posterior_x0020_a_x0020_Fecha_x0020_de_x0020_Corte_x0020_-_x0020_Operaciones_x0020_Canceladas"])
                                ? data["Información_x0020_posterior_x0020_a_x0020_Fecha_x0020_de_x0020_Corte_x0020_-_x0020_Operaciones_x0020_Canceladas"]
                                : [data["Información_x0020_posterior_x0020_a_x0020_Fecha_x0020_de_x0020_Corte_x0020_-_x0020_Operaciones_x0020_Canceladas"]];
                            
                            for (let i = 0; i < dataInformacionPosteriorFechaCorteOperacionesCanceladas.length; i++) {
                                const item = dataInformacionPosteriorFechaCorteOperacionesCanceladas[i];
                                const fechaCorte = item.FechaCorte ? new Date(item.FechaCorte).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
                                const fechaCancelacion = item.FechaCancelacion ? new Date(item.FechaCancelacion).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
                        
                                const informacionPosteriorFechaCorteOperacionesCanceladasRegistro = {
                                    idEQFX_IdentificacionConsultada: idEQFX_IdentificacionConsultada,
                                    FechaCorte: fechaCorte,  // Formato 'yyyy-mm-dd'
                                    Institucion: handleEmptyString(item.Institucion),
                                    NumeroOperacion: handleEmptyString(item.NumeroOperacion),
                                    FechaCancelacion: fechaCancelacion  // Formato 'yyyy-mm-dd'
                                };
                        
                                console.log('Datos de InformacionPosteriorFechaCorteOperacionesCanceladas:', informacionPosteriorFechaCorteOperacionesCanceladasRegistro);
                                
                                const repository = AppDataSource.getRepository(EQFX_InformacionPosteriorFechaCorteOperacionesCanceladas);
                                await repository.save(informacionPosteriorFechaCorteOperacionesCanceladasRegistro);
                            }
                        }
     
                        if(data.Detalle_x0020_de_x0020_operaciones_x0020_vencidas)
                        {

                            const dataDetalleOperacionesVencidas = Array.isArray(data.Detalle_x0020_de_x0020_operaciones_x0020_vencidas)    
                                ? data.Detalle_x0020_de_x0020_operaciones_x0020_vencidas
                                : [data.Detalle_x0020_de_x0020_operaciones_x0020_vencidas];
                            for (let i = 0; i < dataDetalleOperacionesVencidas.length; i++) {
                                const item = dataDetalleOperacionesVencidas[i];
                                const detalleOperacionesVencidasRegistro = {
                                    idEQFX_IdentificacionConsultada: idEQFX_IdentificacionConsultada,
                                    Titulo : handleEmptyString(item.Titulo),
                                    Vencido0a1 : handleEmpyDecimal(item.Vencido0a1),
                                    Vencido1a2 : handleEmpyDecimal(item.Vencido1a2),
                                    Vencido2a3 : handleEmpyDecimal(item.Vencido2a3),
                                    Vencido3a6 : handleEmpyDecimal(item.Vencido3a6),
                                    Vencido6a9 : handleEmpyDecimal(item.Vencido6a9),
                                    Vencido9a12 : handleEmpyDecimal(item.Vencido9a12),
                                    Vencido12a24 : handleEmpyDecimal(item.Vencido12a24),
                                    Vencido24 : handleEmpyDecimal(item.Vencido24),
                                    Vencido36 : handleEmpyDecimal(item.Vencido36),
                                    DemandaJudicial : handleEmpyDecimal(item.DemandaJudicial),
                                    CarteraCastigada : handleEmpyDecimal(item.CarteraCastigada),
                                    Total : handleEmpyDecimal(item.Total)
                                };
                                console.log('Datos de DetalleOperacionesVencidas:', detalleOperacionesVencidasRegistro);
                                const repository = AppDataSource.getRepository(EQFX_DetalleOperacionesVencidas);
                                await repository.save(detalleOperacionesVencidasRegistro);
                            }
                        }
                         console.log('Datos de IdentificacionConsultada:', idEQFX_IdentificacionConsultada, codigoConsulta, mensaje);
                         resolve({
                            idEQFX_IdentificacionConsultada,
                            codigoConsulta,
                            mensajeError: mensaje
                        });
                    } else {
                        reject('No se encontraron datos de IdentificacionConsultada en la respuesta');
                    }

                });
            } catch (error) {
                console.error('Error al procesar la respuesta SOAP:', error);
                reject('Error al procesar la respuesta SOAP');
            }
        });
    });
};


const handleEmptyString = (value) => {
    if (value === null || value === undefined) {
        return ''; // Devuelve cadena vacía si es nulo o indefinido
    }

    // Si es un string, aplicamos .trim()
    if (typeof value === 'string') {
        return value.trim() === '' ? '' : value; // Si es una cadena vacía, devuelve cadena vacía
    }

    return ''; // Si no es una cadena, devuelve cadena vacía
}

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
    consultarExpertoPointTech
};
