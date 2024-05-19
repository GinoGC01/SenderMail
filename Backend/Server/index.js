import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { SEmailouter } from '../Routes/semail.js'
import { CORS } from '../Server/Middlewares/cors.js'

dotenv.config()
const app = express()
app.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express

app.use(CORS())
app.use(bodyParser.json()) //analizar formato JSON
app.use(bodyParser.urlencoded({ extended: false })) //analizar datos codificados en url '...?dato-dato'

app.use('/estudios-juridicos', SEmailouter)

const port = process.env.PORT || 1234
app.listen(port, () => {
  console.log(`Server has listening on https://localhost:${port}`)
})
