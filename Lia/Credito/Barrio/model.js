const { EntitySchema } = require('typeorm');

const Barrio = new EntitySchema({
	name: 'Barrio',
	tableName: 'Cre_Barrio',
	target: class Barrio {},
	columns: {
		idBarrio: { primary: true, type: 'int', generated: true },
		Codigo: { type: 'varchar', length: 20, nullable: true },
		Nombre: { type: 'varchar', length: 100, nullable: true },
		idParroquia: { type: 'int', nullable: true },
		idZona: { type: 'int', nullable: true }
	}
});

module.exports = Barrio;
