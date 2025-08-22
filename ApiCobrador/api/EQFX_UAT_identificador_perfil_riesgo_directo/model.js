/*

CREATE TABLE EQFX_UAT_identificador_perfil_riesgo_directo (
    idEQFX_UAT_identificador_perfil_riesgo_directo INT IDENTITY(1,1) PRIMARY KEY,
    idEQFX_IdentificacionConsultada INT NOT NULL,
    indicador VARCHAR(255) DEFAULT '' ,
    valor VARCHAR(255) DEFAULT '' ,
    fecha DATE NULL,
    FechaSistema DATETIME DEFAULT GETDATE()
);*/

const { EntitySchema } = require('typeorm');
const EQFX_UAT_identificador_perfil_riesgo_directo = new EntitySchema({
    name: 'EQFX_UAT_identificador_perfil_riesgo_directo',
    tableName: 'EQFX_UAT_identificador_perfil_riesgo_directo',
    target: class EQFX_UAT_identificador_perfil_riesgo_directo {
        constructor() {
            this.idEQFX_UAT_identificador_perfil_riesgo_directo = undefined;
            this.idEQFX_IdentificacionConsultada = undefined;
            this.indicador = '';
            this.valor = '';
            this.fecha = null;
            this.FechaSistema = new Date();
        }
    },
    columns: {
        idEQFX_UAT_identificador_perfil_riesgo_directo: {
            type: 'int',
            primary: true,
            generated: true
        },
        idEQFX_IdentificacionConsultada: {
            type: 'int',
            nullable: false
        },
        indicador: {
            type: 'varchar',
            length: 255,
            default: "''"
        },
        valor: {
            type: 'varchar',
            length: 255,
            default: "''"
        },
        fecha: {
            type: 'date',
            nullable: true
        },
        FechaSistema: {
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP'
        }
    }
});

module.exports = EQFX_UAT_identificador_perfil_riesgo_directo;
