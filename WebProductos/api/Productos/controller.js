// controllers/WebProductosController.js
const { AppDataSource } = require("../../../ApiCobrador/api/config/database");
const WebProductos = require("./model");

exports.AllProductos = async (req, res) => {
  try {
    const { estado } = req.query;  // Parametro de estado

    // Buscar los productos basados en el estado
    const productos = await AppDataSource.getRepository(WebProductos)
      .createQueryBuilder('producto')
      .where('producto.Estado = :estado', { estado })
      .getMany();

    // Formatear la respuesta según el formato solicitado
    const formattedProductos = productos.map(producto => ({
      codigo: producto.codigo,
      Articulo: producto.Articulo,
      Grupo: producto.Grupo,
      Marca: producto.Marca,
      SubGrupo: producto.SubGrupo,
      Categoria: producto.Categoria,
      Tarjeta: producto.Tarjeta,
      Credito: producto.Credito,
      Existencia: producto.Existencia,
      imagen_url: producto.imagen_url,
      atributos: {
        Pulgadas: producto.Pulgadas || "",
        Color: producto.Color || "",
        Procesador: producto.Procesador || "",
        MemoriaRam: producto.MemoriaRam || "",
        DiscoDuro: producto.DiscoDuro || "",
        Gaming: producto.Gaming || "",
        Lumenes: producto.Lumenes || "",
        Resolucion: producto.Resolucion || "",
        Potencia: producto.Potencia || "",
        TipoCarga: producto.TipoCarga || "",
        Complementos: producto.Complementos || "",
        Bateria: producto.Bateria || "",
        Capacidad: producto.Capacidad || "",
        Quemadores: producto.Quemadores || "",
        Pixeles: producto.Pixeles || "",
        Almacenamiento: producto.Almacenamiento || "",
        TarjetaGrafica: producto.TarjetaGrafica || "",
        TipoPantalla: producto.TipoPantalla || "",
        SistemaOperativo: producto.SistemaOperativo || "",
        Conectividad: producto.Conectividad || "",
        Sistema: producto.Sistema || "",
        Peso: producto.Peso || "",
        Carga: producto.Carga || "",
        Tipo: producto.Tipo || "",
        PixelesFrontal: producto.PixelesFrontal || "",
        OfertaElectrodomestico: producto.OfertaElectrodomestico || "0",
        OfertaComputo: producto.OfertaComputo || "0",
      },
      imagenes: {
        imagen_1: `https://storage.googleapis.com/point_pweb/web2023/IMAGENES%20WEB/${producto.codigo}_1.jpg`,
        imagen_2: `https://storage.googleapis.com/point_pweb/web2023/IMAGENES%20WEB/${producto.codigo}_2.jpg`,
        imagen_3: `https://storage.googleapis.com/point_pweb/web2023/IMAGENES%20WEB/${producto.codigo}_3.jpg`,
        imagen_4: `https://storage.googleapis.com/point_pweb/web2023/IMAGENES%20WEB/${producto.codigo}_4.jpg`,
        imagen_5: `https://storage.googleapis.com/point_pweb/web2023/IMAGENES%20WEB/${producto.codigo}_5.jpg`,
        imagen_6: `https://storage.googleapis.com/point_pweb/web2023/IMAGENES%20WEB/${producto.codigo}_6.jpg`,
        imagen_7: `https://storage.googleapis.com/point_pweb/web2023/IMAGENES%20WEB/${producto.codigo}_7.jpg`,
        imagen_8: `https://storage.googleapis.com/point_pweb/web2023/IMAGENES%20WEB/${producto.codigo}_8.jpg`,
        imagen_9: `https://storage.googleapis.com/point_pweb/web2023/IMAGENES%20WEB/${producto.codigo}_9.jpg`,
        imagen_10: `https://storage.googleapis.com/point_pweb/web2023/IMAGENES%20WEB/${producto.codigo}_10.jpg`,
      },
      DescripcionWeb: producto.DescripcionWeb || "",
      NombreComercial: producto.NombreComercial || "",
    }));

    // Responder con los datos formateados
    res.json({ transactions: formattedProductos });

  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};
