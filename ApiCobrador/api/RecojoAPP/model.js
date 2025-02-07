// models/Usuario.js


const { EntitySchema } = require('typeorm');


const RecojoAPP = new EntitySchema({
    name: 'RecojoAPP',
    tableName: 'RecojoAPP',
    target: class RecojoAPP {
        constructor() {
            this.idRecojoAPP = undefined;
            this.Comprobante = "";
        }
    },
    columns: {
        idRecojoAPP: {
            primary: true,
            type: 'int',
            generated: true
        },
        Comprobante: {
            type: 'varchar',
            length: 20
        }
    }
});

module.exports = RecojoAPP;

          