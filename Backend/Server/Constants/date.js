// Formatea la fecha de envío
const fechaEnvio = new Date()
fechaEnvio.setHours(fechaEnvio.getHours() - 6)
export const fechaEnvioFormateada = fechaEnvio
  .toISOString()
  .slice(0, 19)
  .replace('T', ' ')
