
    const { EntitySchema } = require('typeorm');

    const Com_CargosDeVentas = new EntitySchema({
        name: 'Com_CargosDeVentas',
        tableName: 'Com_CargosDeVentas',
        target: class Com_CargosDeVentas {
            constructor() {
                this.idCargo = undefined;
                this.Cargo = "";
            }
        },
        columns: {
            idCargo: {
                primary: true,
                type: 'int',
                generated: true
            },
            Cargo: {
                type: 'varchar',
                length: 255
            } 
        }
    });

    module.exports = Com_CargosDeVentas;
