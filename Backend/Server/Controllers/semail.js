import { SEModel } from '../Models/semail.js'
import { v4 as uuidv4 } from 'uuid'
import { sendEmail } from '../Services/nodemailer.js'

export class SEController {
  static async getAll(req, res) {
    try {
      const results = await SEModel.getAll()
      res.json(results)
    } catch (error) {
      console.error('Error al procesar la petición a la base de datos:', error)
      res.status(500).json({
        error:
          'Error al procesar la petición a la base de datos: /estudios-juridicos',
      })
    }
  }

  static async enviarEmail(req, res) {
    try {
      const { subject, message } = req.body
      const results = await SEModel.pendingEmails()
      if (results.length > 0) {
        try {
          const fechaEnvio = new Date()
          fechaEnvio.setHours(fechaEnvio.getHours() - 6)
          const fechaEnvioFormateada = fechaEnvio
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ')

          for (const row of results) {
            await sendEmail(row.email, subject, message)
            await SEModel.updateSendingEmails(row.id, fechaEnvioFormateada)
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
    } catch (error) {
      console.error(error)
      return res
        .status(500)
        .json({ error: 'Error al procesar la petición a base de datos' })
    }
  }

  static async cargarEmail(req, res) {
    try {
      const id = uuidv4()
      const { nombre, ubicacion, email, telefono } = req.body

      if (!nombre || !ubicacion || !email || !telefono) {
        return res.status(400).json({ error: 'Faltan datos requeridos' })
      }

      try {
        await SEModel.postEstudioJuridico(
          id,
          nombre,
          ubicacion,
          email,
          telefono
        )
        await SEModel.postEmailsEnviados(id)

        return res
          .status(200)
          .json({ message: 'Datos insertados correctamente' })
      } catch (error) {
        console.error('Error al insertar datos a la base de datos:', error)
        return res
          .status(500)
          .json({ error: 'Error al insertar datos a la base de datos' })
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error)
      return res.status(500).json({ error: 'Error al procesar la solicitud' })
    }
  }
}
