const { AppDataSource } = require("../../../ApiCobrador/api/config/database");
const EQFX_IdentificacionConsultada = require("./model");
const EQFX_ResultadoSegmentacion = require("../EQFX_ResultadoSegmentacion/model");
const EQFX_ResultadoPoliticas = require("../EQFX_ResultadoPoliticas/model");
const EQFX_ScorePuntajeyGraficoV3 = require("../EQFX_ScorePuntajeyGraficoV3/model");
const EQFX_DeudaReportadaINFOCOM = require("../EQFX_DeudaReportadaINFOCOM/model");
const EQFX_EvolucionHistoricaDistEndeudamientoSICOM = require("../EQFX_EvolucionHistoricaDistEndeudamientoSICOM/model");
const EQFX_EvolucionHistoricaDistEndeudamientoEducativo = require("../EQFX_EvolucionHistoricaDistEndeudamientoEducativo/model"); 
exports.allInsert = async (req, res) => {
  // Desestructurar los objetos recibidos en el body
  const {
    identificacionConsultada,
    resultadoSegmentacion,
    resultadoPoliticas,
    scorePuntaje,
    deudaReportada,
    evolucionHistorica,
    detalleDistribucionEndeudamientoEducativo

  } = req.body;

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
        ResaltadaInv : detalle.resaltadaInv
      };
      await queryRunner.manager.save(EQFX_EvolucionHistoricaDistEndeudamientoEducativo, distribucionEndeudamientoEducativo);
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
