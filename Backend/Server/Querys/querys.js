export const SELLECT_ALL = `
SELECT e.*, ee.enviado, ee.fecha_envio, ee.mensaje, ec.contestado, ec.valorado
FROM estudios_juridicos e
LEFT JOIN emails_enviados ee ON e.id = ee.estudio_juridico_id
INNER JOIN emails_contestados ec on e.id = ec.estudio_juridico_id;
`

export const SELLECT_ALL_NO_CONTESTADOS = `
SELECT e.*, ee.enviado, ee.fecha_envio, ee.mensaje
FROM estudios_juridicos e
LEFT JOIN emails_enviados ee ON e.id = ee.estudio_juridico_id`

export const EMAILS_NO_ENVIADOS = `SELECT estudios_juridicos.id, estudios_juridicos.email
FROM estudios_juridicos
JOIN emails_enviados ON estudios_juridicos.id = emails_enviados.estudio_juridico_id
WHERE emails_enviados.enviado = false;`

export const EMAILS_ASUNTO = `SELECT estudios_juridicos.id, estudios_juridicos.nombre, estudios_juridicos.email,emails_enviados.mensaje
FROM estudios_juridicos
JOIN emails_enviados ON estudios_juridicos.id = emails_enviados.estudio_juridico_id
WHERE emails_enviados.enviado = false
AND estudios_juridicos.asunto = ?;`

export const ACTUALIZAR_EMAIL_ENVIADO = `UPDATE emails_enviados SET enviado = ?, fecha_envio = ?, mensaje = ? WHERE estudio_juridico_id = ?`
export const ACTUALIZAR_EMAIL_CONSTESTADO = `UPDATE emails_contestados SET contestado = ?, valorado = ? WHERE estudio_juridico_id = ?`

export const CARGAR_ESTUDIO_JURIDICO = `INSERT INTO estudios_juridicos (id, nombre, ubicacion, email, telefono, asunto) VALUES (?, ?, ?, ?, ?, ?)`

export const CARGAR_EMAILS_ENVIADOS = `INSERT INTO emails_enviados (estudio_juridico_id, enviado, mensaje) VALUES (?, ?, ?)`
export const CARGAR_EMAILS_CONTESTADOS = `INSERT INTO emails_contestados (estudio_juridico_id, contestado, valorado) VALUES (?, ?, ?)`
