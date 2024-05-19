export const SELLECT_ALL = `
SELECT e.*, ee.enviado, ee.fecha_envio
FROM estudios_juridicos e
LEFT JOIN emails_enviados ee ON e.id = ee.estudio_juridico_id;
`
export const EMAILS_NO_ENVIADOS = `SELECT estudios_juridicos.id, estudios_juridicos.email
FROM estudios_juridicos
JOIN emails_enviados ON estudios_juridicos.id = emails_enviados.estudio_juridico_id
WHERE emails_enviados.enviado = false;`

export const ACTUALIZAR_EMAIL_ENVIADO =
  'UPDATE emails_enviados SET enviado = ?, fecha_envio = ? WHERE estudio_juridico_id = ?'

export const CARGAR_ESTUDIO_JURIDICO = `INSERT INTO estudios_juridicos (id, nombre, ubicacion, email, telefono) VALUES (?, ?, ?, ?, ?)`

export const CARGAR_EMAILS_ENVIADOS = `INSERT INTO emails_enviados (estudio_juridico_id, enviado) VALUES (?, ?)`
