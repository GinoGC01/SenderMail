// Importa la librería mysql2 para interactuar con la base de datos MySQL
import mysql from 'mysql2'
// Importa las consultas SQL definidas en un archivo externo
import {
  ACTUALIZAR_EMAIL_ENVIADO,
  CARGAR_EMAILS_ENVIADOS,
  CARGAR_ESTUDIO_JURIDICO,
  EMAILS_ASUNTO,
  EMAILS_NO_ENVIADOS,
  SELLECT_ALL,
} from '../Querys/querys.js'

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost', // Dirección del servidor de la base de datos
  port: 3306, // Puerto de conexión de la base de datos MySQL
  user: 'root', // Usuario de la base de datos
  password: '1413', // Contraseña del usuario
  database: 'estudios_db', // Nombre de la base de datos a utilizar
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
          reject('Error al ejecutar la consulta SQL: /estudios-juridicos')
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
  static updateSendingEmails(estudioJuridicoId, fechaEnvio) {
    const query = ACTUALIZAR_EMAIL_ENVIADO // Query definida para actualizar estado de envío
    return new Promise((resolve, reject) => {
      // Ejecuta la consulta SQL mediante la conexión a la base de datos
      connection.query(
        query,
        [true, fechaEnvio, estudioJuridicoId],
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
  static postEmailsEnviados(id, enviado = false) {
    const query = CARGAR_EMAILS_ENVIADOS // Query definida para cargar correos electrónicos enviados
    return new Promise((resolve, reject) => {
      // Ejecuta la consulta SQL mediante la conexión a la base de datos
      connection.query(query, [id, enviado], (error, results) => {
        if (error) {
          // Rechaza la promesa en caso de error y devuelve el error
          return reject(error)
        }
        // Resuelve la promesa con los resultados obtenidos de la consulta
        resolve(results)
      })
    })
  }
}
