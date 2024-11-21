const { AppDataSource } = require("../../../ApiCobrador/api/config/database");
const EQFX_IdentificacionConsultada = require("./model");
const EQFX_ResultadoSegmentacion = require("../EQFX_ResultadoSegmentacion/model");
const EQFX_ResultadoPoliticas = require("../EQFX_ResultadoPoliticas/model");
const EQFX_ScorePuntajeyGraficoV3 = require("../EQFX_ScorePuntajeyGraficoV3/model");
const EQFX_DeudaReportadaINFOCOM = require("../EQFX_DeudaReportadaINFOCOM/model");
const EQFX_EvolucionHistoricaDistEndeudamientoSICOM = require("../EQFX_EvolucionHistoricaDistEndeudamientoSICOM/model");
const EQFX_EvolucionHistoricaDistEndeudamientoEducativo = require("../EQFX_EvolucionHistoricaDistEndeudamientoEducativo/model"); 
const EQFX_DeudaTotalSICOM = require("../EQFX_DeudaTotalSICOM/model");
const EQFX_CuotaEstimadaMensualWeb = require("../EQFX_CuotaEstimadaMensualWeb/model");
const EQFX_AnalisisSaldosPorVencerSistemaFinanciero = require("../EQFX_AnalisisSaldosPorVencerSistemaFinanciero/model");
const EQFX_HistorialCrediticio = require("../EQFX_HistorialCrediticio/model");
const EQFX_PerfilRiesgoDirecto = require("../EQFX_PerfilRiesgoDirecto/model");
const EQFX_EvolucionHistoricaDistEndeudamiento = require("../EQFX_EvolucionHistoricaDistEndeudamiento/model");
const EQFX_AnalisisDetalleVencido = require("../EQFX_AnalisisDetalleVencido/model");
const EQFX_EvolucionHistoricaDistEndeudamientoRecursivo = require("../EQFX_EvolucionHistoricaDistEndeudamientoRecursivo/model");
const EQFX_Ultimas10OperacionesCanceladas = require("../EQFX_Ultimas10OperacionesCanceladas/model");
exports.allInsert = async (req, res) => {
  // Desestructurar los objetos recibidos en el body
  const {
    identificacionConsultada,
    resultadoSegmentacion,
    resultadoPoliticas,
    scorePuntaje,
    deudaReportada,
    evolucionHistorica,
    detalleDistribucionEndeudamientoEducativo,
    deudaTotalSegmentosSinIESS,
    cuotaData,
    obtenerAnalisisSaldosPorVencerSistemaFinanciero,
    mantieneHistorialCrediticioDesde,
    ObtenerIdentificadorPerfilRiesgoDirecto,
    RecursivoComposicionEstructuraVencimiento,
    AnalisisDetalleVencido,
    RecursivoDeudaHistorica,
    UltimasOperacionesCanceladas


  } = req.body;
  console.log("UltimasOperacionesCanceladas", UltimasOperacionesCanceladas);
  // Desestructurar los datos dentro de cada objeto
  const { nombreSujeto, tipoDocumento, numeroDocumento } = identificacionConsultada;
  const {
    resultadoEvaluacion, segmentacionCliente, ingresos, gastoHogar, gastoFinanciero,
    rangoIngresos, capacidadDePago, edad, modeloUtilizado, scoreTitular, scoreSobreendeudamiento
  } = resultadoSegmentacion;

  const { score, totalAcum, tasaDeMalosAcum, scoreMin, scoreMax, fechaInicial, fechaFinal } = scorePuntaje;

  // Validación de campos requeridos
  const requiredFields = [
    { name: 'nombreSujeto', value: nombreSujeto },
    { name: 'tipoDocumento', value: tipoDocumento },
    { name: 'numeroDocumento', value: numeroDocumento },
    { name: 'resultadoEvaluacion', value: resultadoEvaluacion },
    { name: 'segmentacionCliente', value: segmentacionCliente },
    { name: 'ingresos', value: ingresos },
    { name: 'gastoHogar', value: gastoHogar },
    { name: 'gastoFinanciero', value: gastoFinanciero },
    { name: 'rangoIngresos', value: rangoIngresos },
    { name: 'capacidadDePago', value: capacidadDePago },
    { name: 'edad', value: edad },
    { name: 'modeloUtilizado', value: modeloUtilizado },
    { name: 'scoreTitular', value: scoreTitular },
    { name: 'scoreSobreendeudamiento', value: scoreSobreendeudamiento },
    { name: 'score', value: score },
    { name: 'totalAcum', value: totalAcum },
    { name: 'tasaDeMalosAcum', value: tasaDeMalosAcum },
    { name: 'scoreMin', value: scoreMin },
    { name: 'scoreMax', value: scoreMax },
    { name: 'fechaInicial', value: fechaInicial },
    { name: 'fechaFinal', value: fechaFinal }
  ];

  // Comprobación de campos requeridos
  for (const field of requiredFields) {
    if (!field.value) {
      return res.status(400).json({ message: `${field.name} es requerido` });
    }
  }

  // Crear el queryRunner para manejar la transacción
  const queryRunner = AppDataSource.createQueryRunner();

  try {
    // Iniciar la transacción
    await queryRunner.startTransaction();

    // Crear y guardar el registro en EQFX_IdentificacionConsultada
    const registro = {
      NombreSujeto: nombreSujeto,
      TipoDocumento: tipoDocumento,
      NumeroDocumento: numeroDocumento,
    };
    const savedRegistro = await queryRunner.manager.save(EQFX_IdentificacionConsultada, registro);

    // Crear el objeto de segmentación con la ID del registro guardado
    const segmentacion = {
      ResultadoEvaluacion: resultadoEvaluacion,
      SegmentacionCliente: segmentacionCliente,
      Ingresos: ingresos,
      GastoHogar: gastoHogar,
      GastoFinanciero: gastoFinanciero,
      RangoIngresos: rangoIngresos,
      CapacidaddePago: capacidadDePago,
      Edad: edad,
      ModeloUtilizado: modeloUtilizado,
      ScoreTitular: scoreTitular,
      ScoreSobreendeudamiento: scoreSobreendeudamiento,
      idEQFX_IdentificacionConsultada: savedRegistro.idEQFX_IdentificacionConsultada
    };
    const savedSegmentacion = await queryRunner.manager.save(EQFX_ResultadoSegmentacion, segmentacion);

    // Insertar las políticas si existen en el array resultadoPoliticas
    for (const politica of resultadoPoliticas) {
      const politicas = {
        Politica: politica.politica,
        Valor: politica.valor,
        Resultado: politica.resultado,
        idEQFX_IdentificacionConsultada: savedRegistro.idEQFX_IdentificacionConsultada
      };
      await queryRunner.manager.save(EQFX_ResultadoPoliticas, politicas);
    }

    // Insertar las deudas reportadas si existen en el array deudaReportadaINFOCOM
    for (const deuda of deudaReportada) {
      const deudaReportada = {
        Institucion: deuda.institucion,
        FechaCorte: deuda.fechaCorte ? deuda.fechaCorte.split('T')[0] + ' ' + deuda.fechaCorte.split('T')[1].split('-')[0] : null, // Formatear la fecha eliminando la zona horaria
        TipoDeudor: deuda.tipoDeudor,
        Total: deuda.total,
        PorVencer: deuda.porVencer,
        NoDevengaInt: deuda.noDevengaInt,
        Vencido: deuda.vencido,
        DemandaJudicial: deuda.demandaJudicial,
        CarteraCastigada: deuda.carteraCastigada,
        DiasVencido: deuda.diasVencido,
        CodigoInstitucionInv: deuda.codigoInstitucionInv,
        CodTipoDeudorInv: deuda.CodTipoDeudorInv,
        NumeroDocumentoInv: deuda.numeroDocumentoInv,
        NombreSujetoInv: deuda.nombreSujetoInv,
        idEQFX_IdentificacionConsultada: savedRegistro.idEQFX_IdentificacionConsultada
      };
      await queryRunner.manager.save(EQFX_DeudaReportadaINFOCOM, deudaReportada);
    }

    // Insertar la evolución histórica si existe en el array evolucionHistorica
    for (const evolucion of evolucionHistorica) {
      const evolucionHistorica = {
        FechaCorte: evolucion.fechaCorte , // Formatear la fecha eliminando la zona horaria
        NOM_INSTITUCION: evolucion.nomInstitucion,
        TIPO_DEUDOR: evolucion.tipoDeudor,
        VAL_X_VENCER: evolucion.valXVencer,
        VAL_VENCIDO: evolucion.valVencido,
        VAL_NDI: evolucion.valNdi,
        VAL_DEM_JUDICIAL: evolucion.valDemJudicial,
        VAL_CART_CASTIGADA: evolucion.valCartCastigada,
        NUM_DIAS_VENCIDO_ACTUALIZADO: evolucion.numDiasVencidoActualizado,
        idEQFX_IdentificacionConsultada: savedRegistro.idEQFX_IdentificacionConsultada
      };
      await queryRunner.manager.save(EQFX_EvolucionHistoricaDistEndeudamientoSICOM, evolucionHistorica);
    }

    // Insertar la distribución de endeudamiento educativo si existe en el array detalleDistribucionEndeudamientoEducativo
    for (const detalle of detalleDistribucionEndeudamientoEducativo) {
      const distribucionEndeudamientoEducativo = {
        FechaCorte: detalle.fechaCorte ? detalle.fechaCorte.split('T')[0] + ' ' + detalle.fechaCorte.split('T')[1].split('-')[0] : null, // Formatear la fecha eliminando la zona horaria
        FechaCorteParam: detalle.fechaCorteParam ? detalle.fechaCorteParam.split('T')[0] + ' ' + detalle.fechaCorteParam.split('T')[1].split('-')[0] : null, // Formatear la fecha eliminando la zona horaria
        CodigoInstitucionParam: detalle.codigoInstitucionParam,
        Institucion: detalle.institucion,
        TipoCreditoParam: detalle.tipoCreditoParam,
        TipoCredito: detalle.tipoCredito,
        SaldoDeuda: detalle.saldoDeuda,
        DemandaJudicial: detalle.demandaJudicial,
        CarteraCastigada: detalle.carteraCastigada,
        Titular : detalle.titular,
        Garante : detalle.garante,
        Codeudor : detalle.codeudor,
        TarjetaCredito : detalle.tarjetaCredito,
        AcuerdoConcordatorio : detalle.acuerdoConcordatorio,
        Detalle : detalle.detalle,
        ResaltadaInv : detalle.resaltadaInv,
        idEQFX_IdentificacionConsultada: savedRegistro.idEQFX_IdentificacionConsultada
      };
      await queryRunner.manager.save(EQFX_EvolucionHistoricaDistEndeudamientoEducativo, distribucionEndeudamientoEducativo);
    }

    // Insertar la deuda total SICOM si existe en el array deudaTotalSegmentosSinIESS
    for (const deuda of deudaTotalSegmentosSinIESS) {
      const deudaTotalSICOM = {
        Titulo: deuda.titulo,
        TituloWSInv: deuda.tituloWSInv,
        PorVencer: deuda.porVencer,
        NoDevengaInt: deuda.noDevengaInt,
        Vencido: deuda.vencido,
        Total: deuda.total,
        DemandaJudicial: deuda.demandaJudicial,
        CarteraCastigada: deuda.carteraCastigada,
        idEQFX_IdentificacionConsultada: savedRegistro.idEQFX_IdentificacionConsultada
      };
      await queryRunner.manager.save(EQFX_DeudaTotalSICOM, deudaTotalSICOM);
    }

    // Insertar la cuota estimada mensual web si existe en el array cuotaEstimadaMensualWeb
    for (const cuota of cuotaData) {
      const cuotaData = {
        Pago: cuota.pago,
        NumeroCreditosComercial: cuota.numeroCreditosComercial,
        TotalVencido: cuota.totalVencido,
        TotalDemanda: cuota.totalDemanda,
        TotalCartera: cuota.totalCartera,
        NumeroCreditosIece: cuota.numeroCreditosIece,
        NumeroOperacionesExcluidas: cuota.numeroOperacionesExcluidas,
        idEQFX_IdentificacionConsultada: savedRegistro.idEQFX_IdentificacionConsultada
      };
      await queryRunner.manager.save(EQFX_CuotaEstimadaMensualWeb, cuotaData);
    }

    // Insertar el análisis de saldos por vencer en el sistema financiero si existe en el array obtenerAnalisisSaldosPorVencerSistemaFinanciero
    for (const analisis of obtenerAnalisisSaldosPorVencerSistemaFinanciero) {
      const analisisSaldosPorVencerSistemaFinanciero = {
        FechaCorte: analisis.fechaCorte ? analisis.fechaCorte.split('T')[0] + ' ' + analisis.fechaCorte.split('T')[1].split('-')[0] : null, // Formatear la fecha eliminando la zona horaria
        Institucion: analisis.institucion,
        TipoCredito: analisis.tipoCredito,
        SaldoVencido: analisis.saldoVencido,
        SaldoPorVencer: analisis.saldoPorVencer,
        SaldoTotal: analisis.saldoTotal,
        idEQFX_IdentificacionConsultada: savedRegistro.idEQFX_IdentificacionConsultada
      };
      await queryRunner.manager.save(EQFX_AnalisisSaldosPorVencerSistemaFinanciero, analisisSaldosPorVencerSistemaFinanciero);
    }

    // Insertar el historial crediticio si existe en el array mantieneHistorialCrediticioDesde
    for (const historial of mantieneHistorialCrediticioDesde) {
      const historialCrediticio = {
        Titulo: historial.titulo,
        PrimeraFecha: historial.primeraFecha ? historial.primeraFecha.split('T')[0] + ' ' + historial.primeraFecha.split('T')[1].split('-')[0] : null, // Formatear la fecha eliminando la zona horaria
        idEQFX_IdentificacionConsultada: savedRegistro.idEQFX_IdentificacionConsultada
      };
      await queryRunner.manager.save(EQFX_HistorialCrediticio, historialCrediticio);
    }

    // Insertar el perfil de riesgo directo si existe en el array ObtenerIdentificadorPerfilRiesgoDirecto
    for (const perfil of ObtenerIdentificadorPerfilRiesgoDirecto) {
      const perfilRiesgoDirecto = {
        Indicador: perfil.indicador,
        Valor: perfil.valor,
        Fecha: perfil.fecha ? perfil.fecha.split('T')[0] + ' ' + perfil.fecha.split('T')[1].split('-')[0] : null, // Formatear la fecha eliminando la zona horaria
        idEQFX_IdentificacionConsultada: savedRegistro.idEQFX_IdentificacionConsultada
      };
      await queryRunner.manager.save(EQFX_PerfilRiesgoDirecto, perfilRiesgoDirecto);
    }
    
    // Insertar el análisis de detalle vencido si existe en el array AnalisisDetalleVencido
    for (const detalle of AnalisisDetalleVencido) {
      const analisisDetalleVencido = {
        idEQFX_IdentificacionConsultada: savedRegistro.idEQFX_IdentificacionConsultada,
        FechaCorte: detalle.fechaCorte ? detalle.fechaCorte.split('T')[0] + ' ' + detalle.fechaCorte.split('T')[1].split('-')[0] : null,
        CodigoInstitucionInv: detalle.codigoInstitucionInv,
        Institucion: detalle.institucion || '',
        Vencido0a1: detalle.vencido0a1 || 0,
        Vencido1a2: detalle.vencido1a2 || 0,
        Vencido2a3: detalle.vencido2a3  || 0,
        Vencido3a6: detalle.vencido3a6 || 0,
        Vencido6a9: detalle.vencido6a9 || 0,
        Vencido9a12: detalle.vencido9a12 || 0,
        Vencido12a24: detalle.vencido12a24 || 0,
        Vencido24a36: detalle.vencido24a36 || 0,
        Vencido36: detalle.vencido36 || 0,
        DemandaJudicial: detalle.demandaJudicial || 0,
        CarteraCastigada: detalle.carteraCastigada || 0,
        NoDevengaInteresesInv: detalle.noDevengaInteresesInv  || 0,
        TotalVencidoInv: detalle.totalVencidoInv || 0,
        AcuerdoConcordato: detalle.acuerdoConcordato || '',
      };
      await queryRunner.manager.save(EQFX_AnalisisDetalleVencido, analisisDetalleVencido);
    }

    // Insertar la evolución histórica de distribución de endeudamiento si existe en el array RecursivoDeudaHistorica
    for (const evolucion of RecursivoDeudaHistorica) {
      // Validar y formatear los valores antes de guardarlos
      const evolucionHistoricaDistEndeudamiento = {
        FechaCorte: evolucion.fechaCorte ? evolucion.fechaCorte.split('T')[0] + ' ' + evolucion.fechaCorte.split('T')[1].split('-')[0] : null, // Formatear la fecha eliminando la zona horaria
       FechaCorteParam : evolucion.fechaCorteParam ? evolucion.fechaCorteParam.split('T')[0] + ' ' + evolucion.fechaCorteParam.split('T')[1].split('-')[0] : null, // Formatear la fecha eliminando la zona horaria
        PorVencer: isNaN(evolucion.porVencer) ? 0 : parseFloat(evolucion.porVencer), // Asegurarse de que sea un número
        NoDevengaInt: isNaN(evolucion.noDevengaInt) ? 0 : parseFloat(evolucion.noDevengaInt),
        Vencido0a1: isNaN(evolucion.vencido0a1) ? 0 : parseFloat(evolucion.vencido0a1),
        Vencido1a2: isNaN(evolucion.vencido1a2) ? 0 : parseFloat(evolucion.vencido1a2),
        Vencido2a3: isNaN(evolucion.vencido2a3) ? 0 : parseFloat(evolucion.vencido2a3),
        Vencido3a6: isNaN(evolucion.vencido3a6) ? 0 : parseFloat(evolucion.vencido3a6),
        Vencido6a9: isNaN(evolucion.vencido6a9) ? 0 : parseFloat(evolucion.vencido6a9),
        Vencido9a12: isNaN(evolucion.vencido9a12) ? 0 : parseFloat(evolucion.vencido9a12),
        Vencido12a24: isNaN(evolucion.vencido12a24) ? 0 : parseFloat(evolucion.vencido12a24),
        Vencido24a36: isNaN(evolucion.vencido24a36) ? 0 : parseFloat(evolucion.vencido24a36),
        Vencido36: isNaN(evolucion.vencido36) ? 0 : parseFloat(evolucion.vencido36),
        DemandaJudicial: isNaN(evolucion.demandaJudicial) ? 0 : parseFloat(evolucion.demandaJudicial),
        CarteraCastigada: isNaN(evolucion.carteraCastigada) ? 0 : parseFloat(evolucion.carteraCastigada),
        SaldoDeuda: isNaN(evolucion.saldoDeuda) ? 0 : parseFloat(evolucion.saldoDeuda),
        tipoDeudaParam: evolucion.tipoDeudaParam || '', // Validar valor de TipoDeudaParam
        idEQFX_IdentificacionConsultada: savedRegistro.idEQFX_IdentificacionConsultada,  // ID de la consulta, asegurarse de que esté presente
      };
      // Guardar el objeto en la base de datos
      try {
        await queryRunner.manager.save(EQFX_EvolucionHistoricaDistEndeudamientoRecursivo, evolucionHistoricaDistEndeudamiento);
      } catch (error) {
        console.error('Error al guardar la evolución histórica:', error);
        // Opcional: manejar el error, como hacer un rollback o continuar con la siguiente iteración
      }
    }

    // Insertar las últimas operaciones canceladas si existe en el array UltimasOperacionesCanceladas
    for (const operacion of UltimasOperacionesCanceladas) {
      // Validación y formateo de los datos antes de guardarlos en la base de datos
      const ultimasOperacionesCanceladas = {
        // Asegúrate de que CodigoInstitucionInv sea un string (por ejemplo, '1006')
        CodigoInstitucionInv: operacion.codigoInstitucionInv || '',
    
        Institucion: operacion.institucion || '', // Asegúrate de que no sea undefined
    
        // El numeroOperaciones es un string, así que no necesitas convertirlo
        NumeroOperaciones: operacion.numeroOperaciones || '',
    
        // Convertir valorOriginal a decimal (asegurándose de que tenga 2 decimales)
        ValorOriginal: isNaN(operacion.valorOriginal) 
          ? 0 
          : parseFloat(operacion.valorOriginal).toFixed(2), // Redondeo a 2 decimales
    
        CodFormaCancelacionInv: operacion.codFormaCancelacionInv || '',
    
        FormaCancelacion: operacion.formaCancelacion || '',
    
        // Formateo de la fecha para SQL Server (formato: 'YYYY-MM-DD HH:mm:ss')
        FechaCancelacion: operacion.fechaCancelacion 
          ? operacion.fechaCancelacion.split('T')[0] + ' ' + operacion.fechaCancelacion.split('T')[1].split('-')[0] 
          : null, // Si no hay fecha, dejamos null
        
        // ID de la identificación consultada
        idEQFX_IdentificacionConsultada: savedRegistro.idEQFX_IdentificacionConsultada
      };
    
      try {
        console.log("ultimasOperacionesCanceladas", ultimasOperacionesCanceladas);
        
        // Guardar en la base de datos
        await queryRunner.manager.save(EQFX_Ultimas10OperacionesCanceladas, ultimasOperacionesCanceladas);
        
      } catch (error) {
        console.error('Error al guardar la evolución histórica:', error);
        // Manejo de errores: Opcional rollback o continuar con la siguiente iteración
        // await queryRunner.rollbackTransaction(); // Descomentar si quieres hacer rollback
      }
    }
    


        
      
    
    // Insertar la evolución histórica de distribución de endeudamiento si existe en el array RecursivoComposicionEstructuraVencimiento
    for (const evolucion of RecursivoComposicionEstructuraVencimiento) {
      // Validar y formatear los valores antes de guardarlos
      const evolucionHistoricaDistEndeudamiento = {
        FechaCorte: evolucion.fechaCorte
          ? evolucion.fechaCorte.split('T')[0] + ' ' + evolucion.fechaCorte.split('T')[1].split('-')[0] 
          : null, // Formatear la fecha eliminando la zona horaria
        Institucion: evolucion.institucion || '',  // Validar valor de Institucion
        PorVencer: isNaN(evolucion.porVencer) ? 0 : parseFloat(evolucion.porVencer), // Asegurarse de que sea un número
        Vencido: isNaN(evolucion.vencido) ? 0 : parseFloat(evolucion.vencido),
        NoDevengaInt: isNaN(evolucion.noDevengaInt) ? 0 : parseFloat(evolucion.noDevengaInt),
        SaldoDeuda: isNaN(evolucion.saldoDeuda) ? 0 : parseFloat(evolucion.saldoDeuda),
        DemandaJudicial: isNaN(evolucion.demandaJudicial) ? 0 : parseFloat(evolucion.demandaJudicial),
        CarteraCastigada: isNaN(evolucion.carteraCastigada) ? 0 : parseFloat(evolucion.carteraCastigada),
        CodigoInstitucionParam: isNaN(evolucion.codigoInstitucionParam) ? 0 : parseFloat(evolucion.codigoInstitucionParam),
        AcuerdoConcordatorio: evolucion.acuerdoConcordatorio || '', // Validar valor de AcuerdoConcordatorio
        InstitucionParam: evolucion.institucionParam || '', // Validar valor de InstitucionParam
        idEQFX_IdentificacionConsultada: savedRegistro.idEQFX_IdentificacionConsultada,  // ID de la consulta, asegurarse de que esté presente
      };
      // Guardar el objeto en la base de datos
      try {
        await queryRunner.manager.save(EQFX_EvolucionHistoricaDistEndeudamiento, evolucionHistoricaDistEndeudamiento);
      } catch (error) {
        console.error('Error al guardar la evolución histórica:', error);
        // Opcional: manejar el error, como hacer un rollback o continuar con la siguiente iteración
      }
    }
    

    // Crear el objeto de puntaje y gráfico con la ID del registro guardado
    const scorePuntajeObj = {
      Score: score,
      TotalAcum: totalAcum,
      TasaDeMalosAcum: tasaDeMalosAcum,
      ScoreMin: scoreMin,
      ScoreMax: scoreMax,
      FechaInicial: fechaInicial,
      FechaFinal: fechaFinal,
      idEQFX_IdentificacionConsultada: savedRegistro.idEQFX_IdentificacionConsultada
    };
    const savedScorePuntaje = await queryRunner.manager.save(EQFX_ScorePuntajeyGraficoV3, scorePuntajeObj);

    // Confirmar la transacción
    await queryRunner.commitTransaction();

    // Devolver los registros guardados como respuesta
    return res.status(201).json({
      idEQFX_IdentificacionConsultada: savedRegistro.idEQFX_IdentificacionConsultada,
      idEQFX_ResultadoSegmentacion: savedSegmentacion.idEQFX_ResultadoSegmentacion,
      idEQFX_ScorePuntajeyGraficoV3: savedScorePuntaje.idEQFX_ScorePuntajeyGraficoV3,
    });

  } catch (error) {
    // Si ocurre un error, hacer rollback
    await queryRunner.rollbackTransaction();
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    // Liberar el queryRunner al finalizar
    await queryRunner.release();
  }
};
