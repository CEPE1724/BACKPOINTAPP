const { EntitySchema } = require('typeorm');

const Provincia = new EntitySchema({
	name: 'Provincia',
	tableName: 'Cre_Provincia',
	target: class Provincia {},
	columns: {
		idProvincia: { primary: true, type: 'int', generated: true },
		Codigo: { type: 'varchar', length: 10, nullable: true },
		Nombre: { type: 'varchar', length: 100, nullable: true },
		Prefijo: { type: 'varchar', length: 10, nullable: true },
		idProvinciaCooP: { type: 'int', nullable: true },
		Banco: { type: 'int', nullable: true },
		BancoAust: { type: 'int', nullable: true }
	}
});

module.exports = Provincia;
