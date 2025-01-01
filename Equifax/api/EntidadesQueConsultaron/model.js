
const { columns } = require('mssql');
const { EntitySchema } = require('typeorm');

const EntidadesQueConsultaron = new EntitySchema({
    name: 'EntidadesQueConsultaron',
    tableName: 'EntidadesQueConsultaron',
    target: class EntidadesQueConsultaron {
        constructor() {
            this.idEntidadesQueConsultaron = undefined;
            this.idEQFX_IdentificacionConsultada = 0;
            this.NombreCliente = '';
            this.Mes1 = '';
            this.Mes2 = '';
            this.Mes3 = '';
            this.Mes4 = '';
            this.Mes5 = '';
            this.Mes6 = '';
            this.Mes7 = '';
            this.Mes8 = '';
            this.Mes9 = '';
            this.Mes10 = '';
            this.Mes11 = '';
            this.Mes12 = '';
            this.ResaltadaInv = '';
            this.FechaSistema = new Date();
            this.Estacion = '';
            this.Usuario = '';
        }
    },
    columns: {
        idEntidadesQueConsultaron: {
            primary: true,
            type: 'int',
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            default: 0
        },
        NombreCliente: {
            type: 'varchar',
            length: 200,
            default: ''
        },
        Mes1: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        Mes2: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        Mes3: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        Mes4: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        Mes5: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        Mes6: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        Mes7: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        Mes8: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        Mes9: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        Mes10: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        Mes11: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        Mes12: {
            type: 'varchar',
            length: 10,
            default: ''
        },
        ResaltadaInv: {
            type: 'char',
            length: 1,
            default: ''
        }
    }
});

module.exports = EntidadesQueConsultaron;
     
