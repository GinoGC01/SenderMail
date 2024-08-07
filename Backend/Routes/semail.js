import { Router } from 'express'
import { SEController } from '../Server/Controllers/semail.js'

export const SEmailouter = Router()

SEmailouter.get('/', SEController.getAll)

SEmailouter.post('/enviar-emails', SEController.enviarEmail)

SEmailouter.post('/enviar-emails-subject', SEController.enviarEmailFromSubject)

SEmailouter.post('/cargar-estudio', SEController.cargarEmail)

SEmailouter.post(
  '/actualizar-estado-contestado',
  SEController.actualizarEstadoContestado
)

SEmailouter.delete('/eliminar-estudio', SEController.eliminarEstudio)
