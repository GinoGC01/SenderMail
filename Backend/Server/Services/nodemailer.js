import nodemailer from 'nodemailer'
import { PASSWORD_EMAIL, USER_EMAIL } from '../Credentials/credentialsEmail.js'

export const sendEmail = async (email, subject, message) => {
  const config = {
    host: 'smtp.gmail.com',
    port: '587',
    auth: {
      user: USER_EMAIL,
      pass: PASSWORD_EMAIL,
    },
  }

  const mensaje = {
    from: USER_EMAIL,
    to: email,
    subject: subject,
    text: message,
  }
  try {
    const transport = nodemailer.createTransport(config)
    const info = await transport.sendMail(mensaje)
    console.log(info)
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error)
  }
}
