const { EntitySchema } = require('typeorm');

const Parentesco = new EntitySchema({
	name: 'Parentesco',
	tableName: 'Cre_Parentesco',
	target: class Parentesco {},
	columns: {
		idParentesco: {
			primary: true,
			type: 'int',
			generated: true
		},
		Codigo: {
			type: 'varchar',
			length: 50,
			nullable: false
		},
		Nombre: {
			type: 'varchar',
			length: 100,
			nullable: false
		}
	}
});

module.exports = Parentesco;
