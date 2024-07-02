// Formatea la fecha de envío

export function fechaFormateada(fecha) {
  fecha.setHours(fecha.getHours() - 6)
  const fechaEnvioFormateada = fecha
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ')

  return fechaEnvioFormateada
}
