
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
            this.Pin = "";
            this.PinSeguridad = "";
            this.TokenExpo ="";
           
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
            type: 'varchar',
            length: 6
        },
        PinSeguridad: {
            type: 'varchar',
            length: 6
        },
        TokenExpo: {
            type: 'varchar',
            length: 500
        },
    }
});

module.exports = DispositivosAPP;
