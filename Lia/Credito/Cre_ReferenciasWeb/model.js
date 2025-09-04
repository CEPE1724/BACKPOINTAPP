const { EntitySchema } = require("typeorm");

const CreReferenciasClientesWeb = new EntitySchema({
  name: "CreReferenciasClientesWeb",
  tableName: "Cre_ReferenciasClientesWeb",
  target: class CreReferenciasClientesWeb {},
  columns: {
    idCre_ReferenciasClientesWeb: {
      primary: true,
      type: "int",
      generated: true,
    },
    idCre_SolicitudWeb: { type: "int", nullable: true },
    idParentesco: { type: "int", nullable: true },
    ApellidoPaterno: { type: "varchar", length: 60, nullable: true },
    PrimerNombre: { type: "varchar", length: 60, nullable: true },
    SegundoNombre: { type: "varchar", length: 100, nullable: true },
    idProvincia: { type: "int", nullable: true },
    idCanton: { type: "int", nullable: true },
    Celular: { type: "varchar", length: 20, nullable: true },
    Direccion: { type: "varchar", length: 200, nullable: true },
    Usuario: { type: "varchar", length: 50, nullable: true },
    FechaSistema: { type: "datetime", nullable: true },
  },
});

module.exports = CreReferenciasClientesWeb;
