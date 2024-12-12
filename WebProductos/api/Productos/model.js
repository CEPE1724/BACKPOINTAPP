

const { EntitySchema } = require('typeorm');
const Web_Productos_XYZ = new EntitySchema({
    name: 'Web_Productos_XYZ',
    tableName: 'Web_Productos_XYZ',
    target: class Web_Productos_XYZ {
        constructor() {
            this.idproductos = undefined;
            this.idarticulo = 0;
            this.codigo = '';
            this.Articulo = '';
            this.idGrupoArticulo = 0;
            this.Grupo = '';    
            this.Marca = '';
            this.idSubGrupo = 0;
            this.SubGrupo = '';
            this.idCategoria = 0;
            this.Categoria = '';
            this.CostoUltimo = 0;
            this.Tarjeta = 0;
            this.Credito = 0;
            this.Existencia = '';
            this.Pulgadas = '';
            this.Color = '';
            this.Procesador = '';
            this.MemoriaRam = '';
            this.DiscoDuro = '';
            this.Gaming = '';
            this.Lumenes = '';
            this.Resolucion = '';
            this.Capacidad = '';
            this.Quemadores = '';
            this.Pixeles = '';
            this.Almacenamiento = '';
            this.TarjetaGrafica = '';
            this.OfertaElectrodomestico = '';
            this.OfertaComputo = '';
            this.created_at = '';
            this.updated_at = '';
            this.estado = 0;
            this.imagen_url = '';
            this.DescripcionWeb = '';
            this.Potencia = '';
            this.TipoCarga = '';
            this.Complementos = '';
            this.Bateria = '';
            this.TipoPantalla = ''; 
            this.SistemaOperativo = '';
            this.Conectividad = '';
            this.Sistema = '';
            this.Peso = '';
            this.Carga = '';
            this.Tipo = '';
            this.PixelesFrontal = '';
            this.Precio = '';
            this.NombreComercial = '';
         
        }
    },
    columns: {
        idproductos: {
            primary: true,
            type: 'int',
            generated: true
        },
        idarticulo: {
            type: 'int'
        },
        codigo: {
            type: 'varchar'
        },
        Articulo: {
            type: 'varchar'
        },
        idGrupoArticulo: {
            type: 'int'
        },
        Grupo: {
            type: 'varchar'
        },
        Marca: {
            type: 'varchar'
        },
        idSubGrupo: {
            type: 'int'
        },
        SubGrupo: {
            type: 'varchar'
        },
        idCategoria: {
            type: 'int'
        },
        Categoria: {
            type: 'varchar'
        },
        CostoUltimo: {
            type: 'decimal'
        },
        Tarjeta: {
            type: 'decimal'
        },
        Credito: {
            type: 'decimal'
        },
        Existencia: {
            type: 'varchar'
        },
        Pulgadas: {
            type: 'varchar'
        },
        Color: {
            type: 'varchar'
        },
        Procesador: {
            type: 'varchar'
        },
        MemoriaRam: {
            type: 'varchar'
        },
        DiscoDuro: {
            type: 'varchar'
        },
        Gaming: {
            type: 'varchar'
        },
        Lumenes: {
            type: 'varchar'
        },
        Resolucion: {
            type: 'varchar'
        },
        Capacidad: {
            type: 'varchar'
        },
        Quemadores: {
            type: 'varchar'
        },
        Pixeles: {
            type: 'varchar'
        },
        Almacenamiento: {
            type: 'varchar'
        },
        TarjetaGrafica: {
            type: 'varchar'
        },
        OfertaElectrodomestico: {
            type: 'varchar'
        },
        OfertaComputo: {
            type: 'varchar'
        },
        created_at: {
            type: 'datetime'
        },
        updated_at: {
            type: 'datetime'
        },
        estado: {
            type: 'int'
        },
        imagen_url: {
            type: 'varchar'
        },
        DescripcionWeb: {
            type: 'varchar'
        },
        Potencia: {
            type: 'varchar'
        },
        TipoCarga: {
            type: 'varchar'
        },
        Complementos: {
            type: 'varchar'
        },
        Bateria: {
            type: 'varchar'
        },
        TipoPantalla: {
            type: 'varchar'
        },
        SistemaOperativo: {
            type: 'varchar'
        },
        Conectividad: {
            type: 'varchar'
        },
        Sistema: {
            type: 'varchar'
        },
        Peso: {
            type: 'varchar'
        },
        Carga: {
            type: 'varchar'
        },
        Tipo: {
            type: 'varchar'
        },
        PixelesFrontal: {
            type: 'varchar'
        },
        Precio: {
            type: 'varchar'
        },
        NombreComercial: {
            type: 'varchar'
        }
    }
});

module.exports = Web_Productos_XYZ;