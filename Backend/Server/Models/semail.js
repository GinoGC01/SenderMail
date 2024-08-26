// Importa la librería mysql2 para interactuar con la base de datos MySQL
import mysql from 'mysql2'
import dotenv from 'dotenv'

// Importa las consultas SQL definidas en un archivo externo
import {
  ACTUALIZAR_EMAIL_CONSTESTADO,
  ACTUALIZAR_EMAIL_ENVIADO,
  CARGAR_EMAILS_CONTESTADOS,
  CARGAR_EMAILS_ENVIADOS,
  CARGAR_ESTUDIO_JURIDICO,
  ELIMINAR_ESTUDIO_CONTESTADO,
  ELIMINAR_ESTUDIO_ENVIADO,
  ELIMINAR_ESTUDIO,
  EMAILS_ASUNTO,
  EMAILS_NO_ENVIADOS,
  SELLECT_ALL,
} from '../Querys/querys.js'

dotenv.config()

dotenv.config()
const host = process.env.HOST_DB
const port = process.env.PORT_DB
const user = process.env.USER_DB
const password = process.env.PASS_DB
const database = process.env.NAME_DB

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host, // Dirección del servidor de la base de datos
  port, // Puerto de conexión de la base de datos MySQL
  user, // Usuario de la base de datos
  password, // Contraseña del usuario
  database, // Nombre de la base de datos a utilizar
})

// Clase SEModel que contiene métodos para interactuar con la base de datos
export class SEModel {
  // Método estático para obtener todos los registros de estudios jurídicos
  static getAll() {
    const query = SELLECT_ALL // Query definida para obtener todos los registros
    return new Promise((resolve, reject) => {
      // Ejecuta la consulta SQL mediante la conexión a la base de datos
      connection.query(query, (error, results) => {
        if (error) {
          // Rechaza la promesa en caso de error y muestra un mensaje descriptivo
          reject(error)
        } else {
          // Resuelve la promesa con los resultados obtenidos de la consulta
          resolve(results)
        }
      })
    })
  }

  // Método estático para obtener correos electrónicos pendientes de envío
  static pendingEmails() {
    const query = EMAILS_NO_ENVIADOS // Query definida para obtener correos no enviados
    return new Promise((resolve, reject) => {
      // Ejecuta la consulta SQL mediante la conexión a la base de datos
      connection.query(query, (error, results) => {
        if (error) {
          // Rechaza la promesa en caso de error y devuelve el error
          return reject(error)
        }
        // Resuelve la promesa con los resultados obtenidos de la consulta
        resolve(results)
      })
    })
  }

  // Método estático para obtener correos electrónicos pendientes de envío segun el asunto
  static pendingSubjectEmails(asunto) {
    // Corregir typo
    const query = EMAILS_ASUNTO
    return new Promise((resolve, reject) => {
      connection.query(query, [asunto], (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result)
      })
    })
  }

  // Método estático para actualizar el estado de envío de correos electrónicos
  static updateSendingEmails(estudioJuridicoId, fechaEnvio, message) {
    const query = ACTUALIZAR_EMAIL_ENVIADO // Query definida para actualizar estado de envío
    return new Promise((resolve, reject) => {
      // Ejecuta la consulta SQL mediante la conexión a la base de datos
      connection.query(
        query,
        [true, fechaEnvio, message, estudioJuridicoId],
        (error, results) => {
          if (error) {
            // Rechaza la promesa en caso de error y devuelve el error
            return reject(error)
          }
          // Resuelve la promesa con los resultados obtenidos de la consulta
          resolve(results)
        }
      )
    })
  }

  // Método estático para insertar un nuevo estudio jurídico en la base de datos
  static postEstudioJuridico(id, nombre, ubicacion, email, telefono, asunto) {
    const query = CARGAR_ESTUDIO_JURIDICO // Query definida para cargar estudio jurídico
    return new Promise((resolve, reject) => {
      // Ejecuta la consulta SQL mediante la conexión a la base de datos
      connection.query(
        query,
        [id, nombre, ubicacion, email, telefono, asunto],
        (error, results) => {
          if (error) {
            // Manejo específico para errores de duplicación de registros
            if (error.code === 'ER_DUP_ENTRY') {
              return reject({ codigo: 'ER_DUP_ENTRY', status: false })
            }
            if (error.code === 'WARN_DATA_TRUNCATED') {
              return reject({ codigo: 'WARN_DATA_TRUNCATED', status: false })
            }
            // Rechaza la promesa con un mensaje de error general
            return reject(`Modelo: ${error.code}`)
          }
          // Resuelve la promesa con los resultados obtenidos de la consulta
          resolve(results)
        }
      )
    })
  }

  // Método estático para insertar un registro de correo electrónico enviado en la base de datos
  static postEmailsEnviados(id, enviado = false, mensaje = '') {
    const query = CARGAR_EMAILS_ENVIADOS // Query definida para cargar correos electrónicos enviados
    return new Promise((resolve, reject) => {
      // Ejecuta la consulta SQL mediante la conexión a la base de datos
      connection.query(query, [id, enviado, mensaje], (error, results) => {
        if (error) {
          // Rechaza la promesa en caso de error y devuelve el error
          return reject(error)
        }
        // Resuelve la promesa con los resultados obtenidos de la consulta
        resolve(results)
      })
    })
  }

  // Método estático para insertar un registro de correo electrónico contestado en la base de datos
  static postEmailsContestados(id, contestado = false, valorado = 1) {
    const query = CARGAR_EMAILS_CONTESTADOS // Query definida para cargar correos electrónicos contestados
    return new Promise((resolve, reject) => {
      // Ejecuta la consulta SQL mediante la conexión a la base de datos
      connection.query(query, [id, contestado, valorado], (error, results) => {
        if (error) {
          // Rechaza la promesa en caso de error y devuelve el error
          return reject(error)
        }
        // Resuelve la promesa con los resultados obtenidos de la consulta
        resolve(results)
      })
    })
  }

  //metodo estatico para actualizar el estado de un email enviado a contestado y su valoracion
  static updateAnsweredEmail(valorado, estudioJuridicoId) {
    const query = ACTUALIZAR_EMAIL_CONSTESTADO
    return new Promise((resolve, reject) => {
      connection.query(
        query,
        [true, valorado, estudioJuridicoId],
        (error, results) => {
          if (error) {
            // Rechaza la promesa en caso de error y devuelve el error
            return reject(error)
          }
          // Resuelve la promesa con los resultados obtenidos de la consulta
          resolve(results)
        }
      )
    })
  }

  static deleteStudio(id) {
    const query_pending = ELIMINAR_ESTUDIO
    return new Promise((resolve, reject) => {
      connection.query(query_pending, [id], (error, result) => {
        if (error) {
          console.log('error deleteStudioPending')
          return reject(error)
        }
        resolve(result)
      })
    })
  }
  static deleteStudioSending(id) {
    const query_sending = ELIMINAR_ESTUDIO_ENVIADO
    return new Promise((resolve, reject) => {
      connection.query(query_sending, [id], (error, result) => {
        if (error) {
          console.log('error deleteStudioPending')
          return reject(error)
        }
        resolve(result)
      })
    })
  }

  static deleteStudioAnswered(id) {
    const query_answered = ELIMINAR_ESTUDIO_CONTESTADO
    return new Promise((resolve, reject) => {
      connection.query(query_answered, [id], (error, result) => {
        if (error) {
          console.log('error deleteStudioPending')
          return reject(error)
        }
        resolve(result)
      })
    })
  }
}
