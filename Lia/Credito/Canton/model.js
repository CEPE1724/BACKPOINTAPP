const { EntitySchema } = require('typeorm');

const Canton = new EntitySchema({
	name: 'Canton',
	tableName: 'Cre_Canton',
	target: class Canton {},
	columns: {
		idCanton: { primary: true, type: 'int', generated: true },
		Codigo: { type: 'varchar', length: 10, nullable: true },
		Nombre: { type: 'varchar', length: 100, nullable: true },
		CodCiudad: { type: 'int', nullable: true },
		idProvincia: { type: 'int', nullable: true },
		idProvinciaCooP: { type: 'int', nullable: true },
		idCiudadCooP: { type: 'int', nullable: true },
		idCantonCoop: { type: 'int', nullable: true },
		Banco: { type: 'int', nullable: true },
		BancoAust: { type: 'int', nullable: true }
	}
});

module.exports = Canton;
