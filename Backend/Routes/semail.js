import { Router } from 'express'
import { SEController } from '../Server/Controllers/semail.js'

export const SEmailouter = Router()

SEmailouter.get('/', SEController.getAll)

SEmailouter.post('/enviar-emails', SEController.enviarEmail)

SEmailouter.post('/cargar-estudio', SEController.cargarEmail)
