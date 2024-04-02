const path = require('path')
const fs = require('fs')
const { response } = require('express')
const { v4: uuidv4 } = require('uuid')
const { actualizarImagen } = require('../helpers/actualizar-imagen')
const fileUpload = (req, res = response) => {
  const tipo = req.params.tipo
  const id = req.params.id
  const tiposValidos = [
    'usuarios',
    'fiestas',
    'salones'
  ]
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: 'No es valido el archivo',
    })
  }
  //validar si existe un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: 'No se envío ningún archivo',
    })
  }

  const file = req.files.imagen
  const nombreCortado = file.name.split('.')
  const extensionArchivo = nombreCortado[nombreCortado.length - 1]

  // if (!extencionValida.includes(extensionArchivo)) {
  //   return res.status(400).json({
  //     ok: false,
  //     msg: 'Extension invalida',
  //   })
  // }

  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`
  const path = `./uploads/${tipo}/${nombreArchivo}`
  file.mv(path, (err) => {
    if (err) {
      console.log('err', err)
      return res.status(500).json({
        ok: false,
        msg: 'Error al subir la imagen',
      })
    }
    actualizarImagen(tipo, id, nombreArchivo)
    return res.status(200).json({
      ok: true,
      msg: 'Archivo subido',
      nombreArchivo,
    })
  })
}

const retornaImagen = (req, res = response) => {
  const tipo = req.params.tipo
  const foto = req.params.foto
  const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`)
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg)
  } else {
    const noFound = path.join(__dirname, `../uploads/notImage.jpg`)
    res.sendFile(noFound)
  }
}

module.exports = {
  fileUpload,
  retornaImagen,
}
