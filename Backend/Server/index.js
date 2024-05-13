import express from 'express'
import dotenv from 'dotenv'
import { CORS } from './Services/cors.js' //midelware CORS
import mysql from 'mysql2'
import { v4 as uuidv4 } from 'uuid'
import bodyParser from 'body-parser'
import { queryAsync } from './Services/queryAsync.js'
import { sendEmail } from './Services/nodemailer.js'

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

//todos los estudios
app.get('/estudios-juridicos', async (req, res) => {
  try {
    const query = `
      SELECT e.*, ee.enviado, ee.fecha_envio
      FROM estudios_juridicos e
      LEFT JOIN emails_enviados ee ON e.id = ee.estudio_juridico_id;
    `

    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error al ejecutar la consulta:', error)
        res.status(500).json({
          error: 'Error al ejecutar la consulta SQL: /estudios-juridicos',
        })
        return
      }

      // Comprobar si no hay resultados
      if (results.length === 0) {
        res
          .status(200)
          .json({ error: 'No se encontraron estudios jurídicos', status: null })
        return
      }

      // Enviar los resultados como respuesta
      res.json(results)
    })
  } catch (error) {
    console.error('Error al procesar la petición a la base de datos:', error)
    res.status(500).json({
      error:
        'Error al procesar la petición a la base de datos: /estudios-juridicos',
    })
  }
})

//envia los correos electronicos y actualiza el valor de enviados
app.post('/enviar-emails', async (req, res) => {
  try {
    const { subject, message } = req.body
    // Consulta SQL para obtener los correos electrónicos de la base de datos
    const query = `SELECT estudios_juridicos.id, estudios_juridicos.email
    FROM estudios_juridicos
    JOIN emails_enviados ON estudios_juridicos.id = emails_enviados.estudio_juridico_id
    WHERE emails_enviados.enviado = false;`
    // Ejecutar la consulta
    connection.query(query, async (error, results) => {
      if (error) {
        console.error('Error al ejecutar la consulta:', error)
        return res.status(500).send('Error al enviar correos electrónicos')
      }
      if (results.length > 0) {
        try {
          // Obtener la fecha y hora actual
          const fechaEnvio = new Date()
          fechaEnvio.setHours(fechaEnvio.getHours() - 6) // Restar 6 horas a la hora actual

          const fechaEnvioFormateada = fechaEnvio
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ')
          // Iterar sobre los resultados y enviar correos electrónicos
          for (const row of results) {
            console.log(row.email)
            await sendEmail(row.email, subject, message)

            // Actualizar el campo enviado y la fecha de envío para el estudio jurídico actual
            await queryAsync(
              connection,
              'UPDATE emails_enviados SET enviado = ?, fecha_envio = ? WHERE estudio_juridico_id = ?',
              [true, fechaEnvioFormateada, row.id]
            )
          }

          return res.status(200).json({
            message: 'Correos electrónicos enviados correctamente',
            ok: true,
          })
        } catch (error) {
          console.error(
            'Error al enviar correos electrónicos: /enviar-emails',
            error
          )
          return res
            .status(500)
            .json({ message: 'Error al enviar correos electrónicos' })
        }
      } else {
        console.log('No se encontraron correos electrónicos')
        return res
          .status(404)
          .json({ message: 'No se encontraron correos electrónicos' })
      }
    })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ error: 'Error al procesar la petición a base de datos' })
  }
})

//subir un estudio
app.post('/estudios-juridicos', async (req, res) => {
  try {
    // Generar un UUID único
    const id = uuidv4()

    // Extraer otros datos del cuerpo de la solicitud
    const { nombre, ubicacion, email, telefono } = req.body

    // Verificar que los campos requeridos no son nulos
    if (!nombre || !ubicacion || !email || !telefono) {
      return res.status(400).json({ error: 'Faltan datos requeridos' })
    }

    // Construir la consulta SQL de inserción para estudios_juridicos
    const queryEstudiosJuridicos = `INSERT INTO estudios_juridicos (id, nombre, ubicacion, email, telefono) VALUES (?, ?, ?, ?, ?)`

    // Ejecutar la consulta SQL para estudios_juridicos
    connection.query(
      queryEstudiosJuridicos,
      [id, nombre, ubicacion, email, telefono],
      (error, results) => {
        if (error) {
          console.error('Error al insertar datos en estudios_juridicos:', error)
          res
            .status(500)
            .json({ error: 'Error al insertar datos a la base de datos' })
          return
        }

        // Insertar el registro correspondiente en la tabla emails_enviados
        const queryEmailsEnviados = `INSERT INTO emails_enviados (estudio_juridico_id, enviado) VALUES (?, ?)`
        //(enviado = false porque recien se está cargando, por defecto es falso.)
        const enviado = false

        connection.query(
          queryEmailsEnviados,
          [id, enviado],
          (error, results) => {
            if (error) {
              console.error(
                'Error al insertar datos en emails_enviados:',
                error
              )
              res
                .status(500)
                .json({ error: 'Error al insertar datos a la base de datos' })
              return
            }

            // Si la inserción fue exitosa, enviar una respuesta de éxito
            res.status(200).json({ message: 'Datos insertados correctamente' })
          }
        )
      }
    )
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al insertar datos a la base de datos' })
  }
})

// app.delete('/estudios-juridicos/borrar-studios/:id', async (req, res) => {
//   const { id } = req.params
//   try {
//     // Llevamos a cabo la petición
//     const query = `DELETE FROM estudios_juridicos WHERE id = ?`

//     // Realizar la consulta para borrar el dato con el ID proporcionado
//     const result = await queryAsync(connection, query, [id])

//     // Verificar si se borró el dato correctamente
//     if (result.affectedRows === 1) {
//       res.status(200).send('Dato borrado correctamente')
//     } else {
//       res.status(404).send('No se encontró el dato con la id proporcionada')
//     }
//   } catch (error) {
//     console.error('Error al intentar borrar el dato: BACKEND', error)
//     res.status(500).send('Error interno del servidor')
//   }
// })

// //actualizar el estado del envio de un estudio
// app.patch('/estudios-juridicos/:id', async (req, res) => {
//   try {
//     const { id } = req.params
//     const { enviado } = req.body // Obtener el valor de enviado desde el cuerpo de la solicitud

//     // Ejecutar la consulta SQL para actualizar el valor de enviado a true
//     const query = 'UPDATE estudios_juridicos SET enviado = ? WHERE id = ?'

//     const result = await queryAsync(connection, query, [enviado, id])
//     // Verificar si se actualizó el dato correctamente
//     if (result.affectedRows === 1) {
//       res.status(200).send('Dato actualizado correctamente')
//     } else {
//       res.status(404).send('No se encontró el dato con la id proporcionada')
//     }
//   } catch (error) {
//     // En caso de error, enviar una respuesta de error al cliente
//     console.error('Error al actualizar enviado:', error)
//     res.status(500).send('Error al actualizar enviado')
//   }
// })

const port = process.env.PORT || 1234
app.listen(port, () => {
  console.log(`Server has listening on https://localhost:${port}`)
})
