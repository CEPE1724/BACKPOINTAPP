const { EntitySchema } = require('typeorm');

const Parroquia = new EntitySchema({
	name: 'Parroquia',
	tableName: 'Cre_Parroquia',
	target: class Parroquia {},
	columns: {
		idParroquia: { primary: true, type: 'int', generated: true },
		Codigo: { type: 'varchar', length: 10, nullable: true },
		Nombre: { type: 'varchar', length: 100, nullable: true },
		idCanton: { type: 'int', nullable: true },
		idZona: { type: 'int', nullable: true },
		idParroquiaCooP: { type: 'int', nullable: true },
		idCantonCoop: { type: 'int', nullable: true },
		Banco: { type: 'int', nullable: true },
		BancoAust: { type: 'int', nullable: true }
	}
});

module.exports = Parroquia;
