import { promises } from 'fs'
const { readFile } = promises // Importa la función `readFile` de Node.js para leer archivos
import { resolve } from 'path' // Importa el módulo `path` de Node.js para trabajar con rutas de archivos

// Función asincrónica para leer el archivo JSON
export async function readJSONFile(rute) {
  const jsonFilePath = resolve(rute) // Obtiene la ruta absoluta del archivo JSON
  try {
    const data = await readFile(jsonFilePath, 'utf-8') // Lee el archivo como texto
    const jsonData = JSON.parse(data) // Parsea el texto como JSON
    return jsonData // Retorna los datos JSON
  } catch (error) {
    console.error(`Error al leer el archivo JSON:${rute}`, error)
  }
}
