import express from 'express'
import dotenv from 'dotenv'
import { CORS } from './Services/cors.js' //midelware CORS
import mysql from 'mysql2'
import { v4 as uuidv4 } from 'uuid'
import bodyParser from 'body-parser'

dotenv.config()
const app = express()
app.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1413',
  database: 'estudios_db',
})

// app.use(CORS)
app.use(CORS)
app.use(bodyParser.json()) //analizar formato JSON
app.use(bodyParser.urlencoded({ extended: false })) //analizar datos codificados en url '...?dato-dato'

app.get('/', async (req, res) => {
  try {
    const query = `Select * from estudios_juridicos`
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error al ejecutar la consulta:', error)
        res.status(500).json({ error: 'Error al ejecutar la consulta SQL' })
        return
      }
      // Enviar los resultados como respuesta
      res.json(results)
    })
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al procesar la petición a la base de datos' })
  }
})

app.post('/', async (req, res) => {
  try {
    // Generar un UUID único
    const id = uuidv4()

    // Extraer otros datos del cuerpo de la solicitud
    const { nombre, ubicacion, email, telefono } = req.body

    // Construir la consulta SQL de inserción
    const query = `INSERT INTO estudios_juridicos (id, nombre, ubicacion, email, telefono) VALUES (?, ?, ?, ?, ?)`

    // Verificar que los campos requeridos no son nulos
    if (!nombre || !ubicacion || !email || !telefono) {
      return res.status(400).json({ error: 'Faltan datos requeridos' })
    }

    // Ejecutar la consulta SQL con los datos proporcionados
    connection.query(
      query,
      [id, nombre, ubicacion, email, telefono],
      (error, results) => {
        if (error) {
          console.error('Error al insertar datos:', error)
          res
            .status(500)
            .json({ error: 'Error al insertar datos a la base de datos' })
          return
        }

        // Si la inserción fue exitosa, enviar una respuesta de éxito
        res.status(200).json({ message: 'Datos insertados correctamente' })
      }
    )
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al insertar datos a la base de datos' })
  }
})

const port = process.env.PORT || 1234
app.listen(port, () => {
  console.log(`Server has listening on https://localhost:${port}`)
})
