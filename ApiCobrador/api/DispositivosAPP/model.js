
const { EntitySchema } = require('typeorm');

const DispositivosAPP = new EntitySchema({
    name: 'DispositivosAPP',
    tableName: 'DispositivosAPP',
    target: class DispositivosAPP {
        constructor() {
            this.idDispositivosAPP = undefined;
            this.idNomina = 0;
            this.idCom_Estado = 0;
            this.Empresa = 1;
            this.Activo = 0;
            this.Cedula = "";
            this.KeyDispositivo = "";
            this.iTipoPersonal = 0;
            this.Pin = 0;
        }
    },
    columns: {
        idDispositivosAPP: {
            primary: true,
            type: 'int',
            generated: true
        },
        idNomina: {
            type: 'int'
        },
        idCom_Estado: {
            type: 'int'
        },
        Empresa: {
            type: 'int'
        },
        Activo: {
            type: 'int'
        },
        Cedula: {
            type: 'varchar',
            length: 20
        },
        KeyDispositivo: {
            type: 'varchar',
            length: 500
        },
        idTipoPersonal: {
            type: 'int'
        },
        Pin: {
            type: 'int'
        }
    }
});

module.exports = DispositivosAPP;
