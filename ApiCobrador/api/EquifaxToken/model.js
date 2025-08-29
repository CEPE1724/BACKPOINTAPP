/*CREATE TABLE EquifaxToken (
    idEquifaxToken INT IDENTITY(1,1) PRIMARY KEY,
    access_token NVARCHAR(MAX),
    token_type VARCHAR(50),
    scope NVARCHAR(500),
    expires_in INT,
    issued_at BIGINT,
    expires_at DATETIME,
    created_at DATETIME DEFAULT GETDATE()
);*/

const { max } = require('date-fns/max');
const { EntitySchema } = require('typeorm');
const EquifaxToken = new EntitySchema({
    name: 'EquifaxToken',
    tableName: 'EquifaxToken',
    target: class EquifaxToken {
        constructor() {
            this.idEquifaxToken = undefined;
            this.access_token = "";
            this.token_type = "";
            this.scope = "";
            this.expires_in = 0;
            this.issued_at = 0;
            this.expires_at = new Date();
            this.created_at = new Date();
        }
    },
    columns: {
        idEquifaxToken: {
            primary: true,
            type: 'int',
            generated: true
        },
        access_token: {
            type: 'nvarchar',
            length: 'MAX'
        },
        token_type: {
            type: 'varchar',
            length: 50
        },
        scope: {
            type: 'nvarchar',
            length: 500
        },
        expires_in: {
            type: 'int'
        },
        issued_at: {
            type: 'bigint'
        },
        expires_at: {
            type: 'datetime'
        },
        created_at: {
            type: 'datetime',
            default: () => "CURRENT_TIMESTAMP"
        }
    }
});

module.exports = EquifaxToken;
