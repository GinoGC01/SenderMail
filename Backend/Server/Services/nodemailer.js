// Importa la librería 'nodemailer' para el envío de correos electrónicos
import nodemailer from 'nodemailer'
// Importa las credenciales de usuario y contraseña desde un archivo externo
import { PASSWORD_EMAIL, USER_EMAIL } from '../Credentials/credentialsEmail.js'
import { htmlContent } from '../Constants/htmlFormat.js'

// Define una función asíncrona para enviar correos electrónicos
export const sendEmail = async (
  email,
  subject,
  message,
  typemessage,
  nombreEstudio
) => {
  // Configuración del servicio de correo electrónico, en este caso, Gmail
  const config = {
    host: 'smtp.gmail.com', // Servidor SMTP de Gmail
    port: '587', // Puerto SMTP para conexiones TLS/STARTTLS
    auth: {
      user: USER_EMAIL, // Dirección de correo electrónico del remitente
      pass: PASSWORD_EMAIL, // Contraseña del remitente
    },
  }

  // Define el mensaje de correo electrónico en formato de texto
  const mensajeOnlyText = {
    from: USER_EMAIL, // Dirección de correo electrónico del remitente
    to: email, // Dirección de correo electrónico del destinatario
    subject: subject, // Asunto del correo electrónico
    text: message, // Cuerpo del correo electrónico en texto plano
  }

  // define el mensaje de correo electrónico en formato HTML - CSS

  const mensajeStructured = {
    from: USER_EMAIL, // Dirección de correo electrónico del remitente
    to: email, // Dirección de correo electrónico del destinatario
    subject: subject, // Asunto del correo electrónico
    html: htmlContent(nombreEstudio),
  }

  try {
    // Crea un transportador usando la configuración especificada
    const transport = nodemailer.createTransport(config)
    // Envía el correo electrónico usando el transportador y el mensaje definido
    console.log('typemessage function: ', typemessage)
    if (typemessage == 'text') {
      const info = await transport.sendMail(mensajeOnlyText)
      // Imprime en la consola la información del envío exitoso
      console.log(info)
    }

    if (typemessage == 'html') {
      const info = await transport.sendMail(mensajeStructured)
      // Imprime en la consola la información del envío exitoso
      console.log(info)
    }
  } catch (error) {
    // Captura e imprime cualquier error que ocurra durante el envío del correo electrónico
    console.error('Error al enviar el correo electrónico:', error)
  }
}
