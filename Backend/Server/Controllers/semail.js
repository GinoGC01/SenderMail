// Importa el modelo de 'semail' para interactuar con la base de datos
import { SEModel } from '../Models/semail.js'
// Importa el generador de UUID para crear identificadores únicos
import { v4 as uuidv4 } from 'uuid'
// Importa la función de envío de correos electrónicos desde el servicio nodemailer
import { sendEmail } from '../Services/nodemailer.js'
import { fechaEnvioFormateada } from '../Constants/date.js'

// Define la clase SEController que maneja las operaciones relacionadas con correos electrónicos
export class SEController {
  // Método estático para obtener todos los registros de la base de datos
  static async getAll(req, res) {
    try {
      // Llama al método del modelo para obtener todos los registros
      const results = await SEModel.getAll()
      // Envía los resultados en formato JSON como respuesta
      res.json(results)
    } catch (error) {
      // Manejo de errores en caso de fallo en la base de datos
      console.error('Error al procesar la petición a la base de datos:', error)
      res.status(500).json({
        error:
          'Error al procesar la petición a la base de datos: /estudios-juridicos',
      })
    }
  }

  // Método estático para enviar correos electrónicos a los destinatarios pendientes
  static async enviarEmail(req, res) {
    try {
      // Extrae el asunto y el mensaje del cuerpo de la petición
      const { subject, message } = req.body
      // Obtiene los correos electrónicos pendientes de enviar desde el modelo
      const results = await SEModel.pendingEmails()
      if (results.length > 0) {
        try {
          // Itera sobre cada correo electrónico pendiente y envía el mensaje
          for (const row of results) {
            await sendEmail(row.email, subject, message)
            // Actualiza el registro en la base de datos con la fecha de envío
            await SEModel.updateSendingEmails(row.id, fechaEnvioFormateada)
          }

          // Responde con éxito si todos los correos fueron enviados
          return res.status(200).json({
            message: 'Correos electrónicos enviados correctamente',
            ok: true,
          })
        } catch (error) {
          // Manejo de errores durante el envío de correos electrónicos
          console.error(
            'Error al enviar correos electrónicos: /enviar-emails',
            error
          )
          return res
            .status(500)
            .json({ message: 'Error al enviar correos electrónicos' })
        }
      } else {
        // Manejo de caso cuando no hay correos electrónicos pendientes
        console.log('No se encontraron correos electrónicos')
        return res
          .status(404)
          .json({ message: 'No se encontraron correos electrónicos' })
      }
    } catch (error) {
      // Manejo de errores generales durante la petición
      console.error(error)
      return res
        .status(500)
        .json({ error: 'Error al procesar la petición a base de datos' })
    }
  }
  // Método estático para enviar correos electrónicos a los destinatarios pendientes segun su asunto
  static async enviarEmailFromSubject(req, res) {
    try {
      const { subject, message, asunto } = req.body
      const results = await SEModel.pendingSubjectEmails(asunto) // Corregir typo
      console.log(results)

      if (results.length > 0) {
        try {
          for (const row of results) {
            await sendEmail(row.email, subject, message, asunto)
            await SEModel.updateSendingEmails(row.id, fechaEnvioFormateada)
          }
          // Responde con éxito si todos los correos fueron enviados
          return res.status(200).json({
            message: 'Correos electrónicos enviados correctamente',
            ok: true,
          })
        } catch (error) {
          // Manejo de errores durante el envío de correos electrónicos
          console.error(
            'Error al enviar correos electrónicos: /enviar-emails',
            error
          )
          return res
            .status(500)
            .json({ message: 'Error al enviar correos electrónicos' })
        }
      } else {
        return res.status(404).json({
          message: 'No se encontraron correos electrónicos pendientes',
        })
      }
    } catch (error) {
      // Manejo de errores generales durante la petición
      console.error(error)
      return res
        .status(500)
        .json({ error: 'Error al procesar los emails seleccionados' })
    }
  }

  // Método estático para cargar un nuevo correo electrónico en la base de datos
  static async cargarEmail(req, res) {
    try {
      // Genera un nuevo identificador único
      const id = uuidv4()
      // Extrae los datos del cuerpo de la petición
      const { nombre, ubicacion, email, telefono, asunto } = req.body

      // Verifica que todos los datos requeridos estén presentes
      if (!nombre || !ubicacion || !email || !telefono || !asunto) {
        return res.status(400).json({ error: 'Faltan datos requeridos' })
      }

      try {
        // Inserta el nuevo registro en la base de datos
        await SEModel.postEstudioJuridico(
          id,
          nombre,
          ubicacion,
          email,
          telefono,
          asunto
        )
        // Inserta el registro de correo enviado en la base de datos
        await SEModel.postEmailsEnviados(id)

        // Responde con éxito si los datos fueron insertados correctamente
        return res
          .status(200)
          .json({ message: 'Datos insertados correctamente' })
      } catch (error) {
        // Manejo de errores durante la inserción en la base de datos
        console.error('Controlador: ', error)
        if (error.codigo === 'ER_DUP_ENTRY') {
          return res
            .status(400)
            .json({ error: 'Datos Existentes', codigo: 'dato-existente' })
        }
        return res
          .status(500)
          .json({ error: 'Error al insertar datos a la base de datos' })
      }
    } catch (error) {
      // Manejo de errores generales durante la solicitud
      console.error('Error al procesar la solicitud:', error)
      return res.status(500).json({ error: 'Error al procesar la solicitud' })
    }
  }
}
