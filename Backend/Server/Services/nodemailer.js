import nodemailer from 'nodemailer'
// Importa las credenciales de usuario y contraseña
import {
  HOST_SERVICE_EMAIL,
  PASSWORD_EMAIL,
  PORT_SERVICE_EMAIL,
  USER_EMAIL,
} from '../Credentials/credentialsEmail.js'
// contenido del mensaje estructurado
import { htmlContent } from '../Constants/htmlFormat.js'
//types
import {
  TYPE_HTML,
  TYPE_IMPROVE_PAGE,
  TYPE_NEW_PAGE,
  TYPE_TEXT,
} from '../Constants/dataType.js'

// Define una función asíncrona para enviar correos electrónicos
export const sendEmail = async (
  email, //email destinatario
  subject, // asunto del email (se muestr en el correo) - solo texto
  message, // mensaje en el email en caso de type:text y en el sistema en caso de type:html
  typemessage, //tipo de mensaje (text || html)
  nombreEstudio, // nombre del estudio juridico
  asunto //asunto del email - clasificacion (newPage || ImprovePage)
) => {
  // Configuración del servicio de correo electrónico, en este caso, Gmail
  const config = {
    host: HOST_SERVICE_EMAIL, // Servidor SMTP de Gmail
    port: PORT_SERVICE_EMAIL, // Puerto SMTP para conexiones TLS/STARTTLS
    auth: {
      user: USER_EMAIL, // Dirección de correo electrónico del remitente
      pass: PASSWORD_EMAIL, // Contraseña del remitente
    },
  }

  // Define el mensaje de correo electrónico
  const mensaje = {
    from: USER_EMAIL, // Dirección de correo electrónico del remitente
    to: email, // Dirección de correo electrónico del destinatario
  }

  //formato de texto
  const mensajeOnlyText = {
    ...mensaje,
    subject,
    text: message, // Cuerpo del correo electrónico en texto plano
  }

  try {
    // Crea un transportador usando la configuración especificada
    const transport = nodemailer.createTransport(config)

    // Envía el correo electrónico usando el transportador y el mensaje definido
    if (typemessage == TYPE_TEXT) {
      const info = await transport.sendMail(mensajeOnlyText)
      // Imprime en la consola la información del envío exitoso
      console.log(info)
      return true
    }

    //remodelar pagina email
    if (typemessage == TYPE_HTML && asunto == TYPE_IMPROVE_PAGE) {
      const { messageImprove, subjectImprove } = htmlContent(nombreEstudio)
      //formato HTML CSS reestructracion de página
      const mensajeRefactorizarPagina = {
        ...mensaje,
        subject: subjectImprove,
        html: messageImprove,
      }
      const info = await transport.sendMail(mensajeRefactorizarPagina)
      // Imprime en la consola la información del envío exitoso
      console.log(info)
      return true
    }

    //Nueva pagina email
    if (typemessage == TYPE_HTML && asunto == TYPE_NEW_PAGE) {
      const { messageNewPage, subjectNewPage } = htmlContent(nombreEstudio)
      //formato HTML CSS creacion de página
      const mensajeNuevaPagina = {
        ...mensaje,
        subject: subjectNewPage, // Asunto del correo electrónico
        html: messageNewPage,
      }
      const info = await transport.sendMail(mensajeNuevaPagina)
      // Imprime en la consola la información del envío exitoso
      console.log(info)
      return true
    }

    return false
  } catch (error) {
    // Captura e imprime cualquier error que ocurra durante el envío del correo electrónico
    console.error('Error al enviar el correo electrónico:', error)
  }
}
