
const { EntitySchema } = require('typeorm');
    const Transaccion_PayJoy_Api_Rest = new EntitySchema({
        name: 'Transaccion_PayJoy_Api_Rest',
        tableName: 'Transaccion_PayJoy_Api_Rest',
        target: class Transaccion_PayJoy_Api_Rest {
            constructor() {
                this.idtransaccion = undefined;
                this.pago = 0.00;
                this.moneda = '';
                this.idCliente = 0;
                this.nombreClientes = '';
                this.telefonoCliente = '';
                this.imeiDispositivo = '';
                this.telefonoDispositivo = '';
                this.simNumeroDispositivo = '';
                this.idFamilia = 0;
                this.nombreFamilia = '';
                this.idModelo = 0;
                this.modelo = '';
                this.nombreModelo = '';
                this.idOrdenFinanza = 0;
                this.pagoInicial = 0.00;
                this.montoFinanciero = 0.00;
                this.costoMensual = 0.00;
                this.meses = 0;
                this.precioAntesImpuesto = 0.00;
                this.montoCompra = 0.00;
                this.costoSemanal = 0.00;
                this.idVendedor = 0;
                this.nombreVendedor = '';
                this.idEmpleadoVentas = 0;
                this.nombreEmpleadoVentas = '';
                this.tiempo = '';
                this.type = '';
                this.estado = 0;
                this.tipo_pago = 0;
                this.FechaSistema = new Date();
                this.Usuario = '';
                this.idDocumento = 0;
                this.idMysql = 0;
                this.ingreso_manual = false;
                this.uuid = '';
            }
        }
        ,
        columns: {
            idtransaccion: {
                primary: true,
                type: 'int',
                generated: true
            },
            pago: {
                type: 'decimal',
                precision: 18,
                scale: 2,
                nullable: true
            },
            moneda: {
                type: 'varchar',
                length: 50,
                nullable: true
            },
            idCliente: {
                type: 'int',
                nullable: true
            },
            nombreClientes: {
                type: 'varchar',
                length: 250,
                nullable: true
            },
            telefonoCliente: {
                type: 'varchar',
                length: 50,
                nullable: true
            },
            imeiDispositivo: {
                type: 'varchar',
                length: 50,
                nullable: true
            },
            telefonoDispositivo: {
                type: 'varchar',
                length: 50,
                nullable: true
            },
            simNumeroDispositivo: {
                type: 'varchar',
                length: 50,
                nullable: true
            },
            idFamilia: {
                type: 'int',
                nullable: true
            },
            nombreFamilia: {
                type: 'varchar',
                length: 250,
                nullable: true
            },
            idModelo: {
                type: 'int',
                nullable: true
            },
            modelo: {
                type: 'varchar',
                length: 250,
                nullable: true
            },
            nombreModelo: {
                type: 'varchar',
                length: 250,
                nullable: true
            },
            idOrdenFinanza: {
                type: 'int',
                nullable: true
            },
            pagoInicial: {
                type: 'decimal',
                precision: 18,
                scale: 2,
                nullable: true
            },
            montoFinanciero: {
                type: 'decimal',
                precision: 18,
                scale: 2,
                nullable: true
            },
            costoMensual: {
                type: 'decimal',
                precision: 18,
                scale: 2,
                nullable: true
            },
            meses: {
                type: 'int',
                nullable: true
            },
            precioAntesImpuesto: {
                type: 'decimal',
                precision: 18,
                scale: 2,
                nullable: true
            },
            montoCompra: {
                type: 'decimal',
                precision: 18,
                scale: 2,
                nullable: true
            },
            costoSemanal: {
                type: 'decimal',
                precision: 18,
                scale: 2,
                nullable: true
            },
            idVendedor: {
                type: 'int',
                nullable: true
            },
            nombreVendedor: {
                type: 'varchar',
                length: 250,
                nullable: true
            },
            idEmpleadoVentas: {
                type: 'int',
                nullable: true
            },
            nombreEmpleadoVentas: {
                type: 'varchar',
                length: 250,
                nullable: true
            },
            tiempo: {
                type: 'varchar',
                length: 50,
                nullable: true
            },
            type: {
                type: 'varchar',
                length: 250,
                nullable: true
            },
            estado: {
                type: 'int',
                nullable: true,
                default: 0
            },
            tipo_pago: {
                type: 'int',
                nullable: true,
                default: 0
            },
            FechaSistema: {
                type: 'datetime',
                nullable: true,
                default: () => 'GETDATE()'
            },
            Usuario: {
                type: 'varchar',
                length: 50,
                nullable: true,
                default: () => 'SUSER_SNAME()'
            },
            idDocumento: {
                type: 'int',
                nullable: true,
                default: 0
            },
            idMysql: {
                type: 'int',
                nullable: true,
                default: 0
            },
            ingreso_manual: {
                type: 'bit',
                nullable: true,
                default: 0
            },
            uuid: {
                type: 'varchar',
                length: 250,
                nullable: true
            }
        }
    });
    module.exports = Transaccion_PayJoy_Api_Rest;
