
 const { EntitySchema } = require('typeorm');

    const Com_Rango = new EntitySchema({
        name: 'Com_Rango',
        tableName: 'Com_Rango',
        target: class Com_Rango {
            constructor() {
                this.idCom_Rango = undefined;
                this.Rango = "";
                this.Bono = 0;
                this.Bono1 = 0;
                this.Bono2 = 0;
                this.Bono3 = 0;
            }
        },
        columns: {
            idCom_Rango: {
                primary: true,
                type: 'int',
                generated: true
            },
            Rango: {
                type: 'varchar',
                length: 20
            },
            Bono: {
                type: 'decimal',
                precision: 18,
                scale: 2
            },
            Bono1: {
                type: 'decimal',
                precision: 18,
                scale: 2
            },
            Bono2: {
                type: 'decimal',
                precision: 18,
                scale: 2
            },
            Bono3: {
                type: 'decimal',
                precision: 18,
                scale: 2
            }
        }
    });

    module.exports = Com_Rango;