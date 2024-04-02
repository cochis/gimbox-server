const jwt = require('jsonwebtoken')

const validarJWT = (req, res, next) => {
  // Leer el Token
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la petición',
    })
  }

  try {
    const { usuario } = jwt.verify(token, process.env.JWT_SECRET)
    req.uid = usuario.uid
    next()
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido',
    })
  }
}

const validarAdminJWT = (req, res, next) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la petición',
    })
  }

  try {
    const { usuario } = jwt.verify(token, process.env.JWT_SECRET)

    if (
      usuario.role !== 'ADMIN_ROLE'
    ) {
      return res.status(203).json({
        ok: false,
        msg: 'Usuario no autorizado ADM',
      })
    }
    req.uid = usuario.uid

    next()
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido',
    })
  }
}
const validarStdJWT = (req, res, next) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la petición',
    })
  }

  try {
    const { usuario } = jwt.verify(token, process.env.JWT_SECRET)
    if (usuario.role !== 'STD_ROLE') {
      return res.status(203).json({
        ok: false,
        msg: 'Usuario no autorizado STD',
      })
    }
    req.uid = usuario.uid
    next()
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido',
    })
  }
}
const validarMstJWT = (req, res, next) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la petición',
    })
  }

  try {
    const { usuario } = jwt.verify(token, process.env.JWT_SECRET)
    if (usuario.role !== 'MST_ROLE') {
      return res.status(203).json({
        ok: false,
        msg: 'Usuario no autorizado MST',
      })
    }
    req.uid = usuario.uid
    next()
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido',
    })
  }
}

module.exports = {
  validarJWT,
  validarAdminJWT,
  validarStdJWT,
  validarMstJWT,
}
