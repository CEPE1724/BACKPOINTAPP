
const { columns } = require('mssql');
const { EntitySchema } = require('typeorm');
    const transaccionesCognoware_1 = new EntitySchema({
        name: 'transaccionesCognoware_1',
        tableName: 'transaccionesCognoware_1',
        target: class transaccionesCognoware_1 {
            constructor() {
              this.idtransaccionesCognoware = undefined;
              this.idtransacciones = 0;
                this.equifax_segmentacion = '';
                this.equifax_rangoIngresos = '';
                this.equifax_capacidadPago = '';
                this.equifax_scoreInclusion = '';
                this.equifax_score = '';
                this.equifax_scoreSobreendeudamiento = '';
                this.equifax_carteraCastigada = '';
                this.equifax_totalvencido = '';
                this.equifax_carteraCastigada = '';
                this.identificacion = '';
                this.nombre = '';
                this.fechaNacimiento = '';
                this.genero = '';
                this.email = '';
                this.actividadLaboral = '';
                this.estabilidadLaboral = '';
                this.telefono = '';
                this.segmento = '';
                this.resultado = '';
                this.valorCuota = 0;
                this.numeroRequerimiento = 0;
                this.SnumeroRequerimiento = '';
                this.respuesta = '';
                this.local = '';
                this.estadoSolicitud = '';
                this.estadoCivil = '';
                this.nivelEducacion = '';
                this.paisNacimiento = '';
                this.provinciaNacimiento = '';
                this.cantonNacimiento = '';
                this.parroquiaNacimiento = '';
                this.codigoPostalNacimiento = '';
                this.nacionalidadNacimiento = '';
                this.fechaIngreso = '';
                this.fechaRespuesta = '';
                this.aprobador = '';
                this.estado = 0;
                this.fechaTransaccion = '';
                this.idDocumento = 0;
                this.idCre_DatosGenerales = 0;
                this.fechaSistema = '';
                this.usuario = '';
                this.estacion = '';
                this.Duplicado = 0;
                this.equifax_carteraCastigadaHistorico = '';
                this.equifax_carteraVencidaHistorico = '';
                this.etapa = '';
                this.estadoRequerimiento = '';
                this.motivoRechazo = '';
                this.usuarioTransaccion = '';
                this.tipoConsulta = '';
                this.nacionalidad = '';
                this.App = 0;
            }

        },
        columns: {
            idtransaccionesCognoware: {
                primary: true,
                type: 'int',
                generated: true
            },
            idtransacciones: {
                type: 'int'
            },
            equifax_segmentacion: {
                type: 'varchar'
            },
            equifax_rangoIngresos: {
                type: 'varchar'
            },
            equifax_capacidadPago: {
                type: 'varchar'
            },
            equifax_scoreInclusion: {
                type: 'varchar'
            },
            equifax_score: {
                type: 'varchar'
            },
            equifax_carteraCastigada: {
                type: 'varchar'
            },
            equifax_scoreSobreendeudamiento: {
                type: 'varchar'
            },
            equifax_totalvencido: {
                type: 'varchar'
            },
            equifax_carteraCastigada: {
                type: 'varchar'
            },
            identificacion: {
                type: 'varchar'
            },
            nombre: {
                type: 'varchar'
            },
            fechaNacimiento: {
                type: 'date'
            },
            genero: {
                type: 'varchar'
            },
            email: {
                type: 'varchar'
            },
            actividadLaboral: {
                type: 'varchar'
            },
            estabilidadLaboral: {
                type: 'varchar'
            },
            telefono: {
                type: 'varchar'
            },
            segmento: {
                type: 'varchar'
            },
            resultado: {
                type: 'varchar'
            },
            valorCuota: {
                type: 'decimal'
            },
            numeroRequerimiento: {
                type: 'decimal'
            },
            SnumeroRequerimiento: {
                type: 'varchar'
            },
            respuesta: {
                type: 'varchar'
            },
            local: {
                type: 'varchar'
            },
            estadoSolicitud: {
                type: 'varchar'
            },
            estadoCivil: {
                type: 'varchar'
            },
            nivelEducacion: {
                type: 'varchar'
            },
            paisNacimiento: {
                type: 'varchar'
            },
            provinciaNacimiento: {
                type: 'varchar'
            },
            cantonNacimiento: {
                type: 'varchar'
            },
            parroquiaNacimiento: {
                type: 'varchar'
            },
            codigoPostalNacimiento: {
                type: 'varchar'
            },
            nacionalidadNacimiento : {
                type: 'varchar'
            },
            fechaIngreso: {
                type: 'datetime'
            },
            fechaRespuesta: {
                type: 'datetime'
            },
            aprobador: {
                type: 'varchar'
            },
            estado: {
                type: 'int'
            },
            fechaTransaccion: {
                type: 'datetime'
            },
            idDocumento: {
                type: 'int'
            },
            idCre_DatosGenerales: {
                type: 'int'
            },
            fechaSistema: {
                type: 'datetime'
            },
            usuario: {
                type: 'varchar'
            },
            estacion: {
                type: 'varchar'
            },
            Duplicado: {
                type: 'int'
            },
            equifax_carteraCastigadaHistorico: {
                type: 'varchar'
            },
            equifax_carteraVencidaHistorico: {
                type: 'varchar'
            },
            etapa: {
                type: 'varchar'
            },
            estadoRequerimiento: {
                type: 'varchar'
            },
            motivoRechazo: {
                type: 'varchar'
            },
            usuarioTransaccion: {
                type: 'varchar'
            },
            tipoConsulta: {
                type: 'varchar'
            },
            nacionalidad: {
                type: 'varchar'
            },
            App: {
                type: 'int'
            }
        }
    });

    module.exports = transaccionesCognoware_1;