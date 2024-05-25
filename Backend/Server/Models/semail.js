import mysql from 'mysql2'
import {
  ACTUALIZAR_EMAIL_ENVIADO,
  CARGAR_EMAILS_ENVIADOS,
  CARGAR_ESTUDIO_JURIDICO,
  EMAILS_NO_ENVIADOS,
  SELLECT_ALL,
} from '../Querys/querys.js'

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1413',
  database: 'estudios_db',
})

export class SEModel {
  static getAll() {
    const query = SELLECT_ALL
    return new Promise((resolve, reject) => {
      connection.query(query, (error, results) => {
        if (error) {
          reject('Error al ejecutar la consulta SQL: /estudios-juridicos')
        } else {
          resolve(results)
        }
      })
    })
  }

  static pendingEmails() {
    const query = EMAILS_NO_ENVIADOS
    return new Promise((resolve, reject) => {
      connection.query(query, (error, results) => {
        if (error) {
          return reject(error)
        }
        resolve(results)
      })
    })
  }

  static updateSendingEmails(estudioJuridicoId, fechaEnvio) {
    const query = ACTUALIZAR_EMAIL_ENVIADO
    return new Promise((resolve, reject) => {
      connection.query(
        query,
        [true, fechaEnvio, estudioJuridicoId],
        (error, results) => {
          if (error) {
            return reject(error)
          }
          resolve(results)
        }
      )
    })
  }

  static postEstudioJuridico(id, nombre, ubicacion, email, telefono) {
    const query = CARGAR_ESTUDIO_JURIDICO
    return new Promise((resolve, reject) => {
      connection.query(
        query,
        [id, nombre, ubicacion, email, telefono],
        (error, results) => {
          if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
              return reject({ codigo: 'ER_DUP_ENTRY', status: false })
            }
            return reject(`Modelo: ${error.code}`)
          }
          resolve(results)
        }
      )
    })
  }

  static postEmailsEnviados(id, enviado = false) {
    const query = CARGAR_EMAILS_ENVIADOS
    return new Promise((resolve, reject) => {
      connection.query(query, [id, enviado], (error, results) => {
        if (error) {
          return reject(error)
        }
        resolve(results)
      })
    })
  }
}
