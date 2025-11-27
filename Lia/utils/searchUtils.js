// utils/searchUtils.js

// Stopwords en español
const stopwords = new Set([
  'el',
  'la',
  'de',
  'que',
  'y',
  'a',
  'en',
  'un',
  'ser',
  'se',
  'no',
  'haber',
  'por',
  'con',
  'su',
  'para',
  'como',
  'estar',
  'tener',
  'le',
  'lo',
  'todo',
  'pero',
  'más',
  'hacer',
  'o',
  'poder',
  'decir',
  'este',
  'ir',
  'otro',
  'ese',
  'si',
  'me',
  'ya',
  'ver',
  'porque',
  'dar',
  'cuando',
  'él',
  'muy',
  'sin',
  'vez',
  'mucho',
  'saber',
  'qué',
  'sobre',
  'mi',
  'alguno',
  'mismo',
  'yo',
  'también',
  'hasta',
  'año',
  'querer',
  'entre',
  'así',
  'desde',
  'grande',
  'eso',
  'ni',
  'nos',
  'llegar',
  'pasar',
  'tiempo',
  'ella',
  'sí',
  'día',
  'bien',
  'poco',
  'deber',
  'entonces',
  'poner',
  'cosa',
  'tanto',
  'hombre',
  'parecer',
  'nuestro',
  'tan',
  'donde',
  'ahora',
  'parte',
  'después',
  'vida',
  'quedar',
  'siempre',
  'creer',
  'hablar',
  'llevar',
  'dejar'
])

// Normalizar texto (quitar acentos, minúsculas, etc)
function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s.]/g, ' ')
    .trim()
}

// Tokenizar (separar en palabras)
function tokenizar(texto) {
  return texto.split(/\s+/).filter((palabra) => palabra.length > 0)
}

// Detectar si es un número
function esNumero(palabra) {
  return /^\d+(\.\d+)?$/.test(palabra)
}

// Stemming simple para español
function aplicarStemming(palabra) {
  if (palabra.length <= 3) return palabra

  if (palabra.endsWith('es') && palabra.length > 4) {
    return palabra.slice(0, -2)
  }
  if (palabra.endsWith('s') && palabra.length > 3) {
    return palabra.slice(0, -1)
  }

  const sufijos = [
    'ción',
    'sión',
    'dor',
    'dora',
    'mente',
    'ito',
    'ita',
    'illo',
    'illa',
    'able',
    'ible'
  ]
  for (const sufijo of sufijos) {
    if (palabra.endsWith(sufijo) && palabra.length > sufijo.length + 3) {
      return palabra.slice(0, -sufijo.length)
    }
  }

  return palabra
}

// Función principal para procesar términos de búsqueda
exports.procesarTerminosBusqueda = (texto) => {
  if (!texto) return []

  const textoNormalizado = normalizarTexto(texto)
  const palabras = tokenizar(textoNormalizado)

  const terminosFinales = []

  palabras.forEach((palabra) => {
    // Si es número, agregar con prefijo NUM:
    if (esNumero(palabra)) {
      terminosFinales.push(`NUM:${palabra}`)
      return
    }

    // Ignorar palabras muy cortas que NO son números
    if (palabra.length <= 1) {
      return
    }

    // Ignorar stopwords
    if (stopwords.has(palabra)) {
      return
    }

    // Agregar la palabra original normalizada
    terminosFinales.push(palabra)

    // Aplicar stemming
    const stem = aplicarStemming(palabra)
    if (stem !== palabra && stem.length > 2) {
      terminosFinales.push(stem)
    }
  })

  return terminosFinales
}
