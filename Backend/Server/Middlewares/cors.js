import cors from 'cors'
const ACCEPTED_ORIGINS = [
  'http://localhost:1234',
  'http://localhost:3306',
  'http://localhost:5173',
]

export const CORS = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true)
      }

      if (!origin) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    },
  })
