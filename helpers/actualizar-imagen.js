const fs = require('fs')
const Usuario = require('../models/usuario')




const borrarImagen = (path) => {

  if (fs.existsSync(path)) {
    console.log('fs.existsSync(path)', fs.existsSync(path))
    fs.unlinkSync(path)
  }
}
const actualizarImagen = async (tipo, id, nombreArchivo) => {
  let pathViejo = ''
  switch (tipo) {
    case 'usuarios':
      const usuario = await Usuario.findById(id)
      if (!usuario) {
        return false
      }
      pathViejo = `./uploads/usuarios/${usuario.img}`
      if (usuario.img && usuario.img !== '') {

        borrarImagen(pathViejo)
      }
      usuario.img = nombreArchivo
      await usuario.save()
      return true
      break
    default:
      break
  }
}
const actualizarViaje = async (id, nombreArchivo, tipo, idViaje) => {



  let pathViejo = ''
  const abasto = await Abasto.findById(id)

  if (!abasto) {
    return false
  }

  console.log('tipo', tipo)
  console.log('abasto.viajes[ Number(idViaje)].basculaOrigen', abasto.viajes[Number(idViaje)])
  if (tipo == 'basculaOrigen') {

    pathViejo = `./uploads/abastos/${abasto.viajes[Number(idViaje)].fotoTicketOrigen}`
    if (abasto.viajes[Number(idViaje)].fotoTicketOrigen !== '') {

      borrarImagen(pathViejo)
    }
  } else {
    pathViejo = `./uploads/abastos/${abasto.viajes[Number(idViaje)].fotoTicketDestino}`
    if (abasto.viajes[Number(idViaje)].fotoTicketDestino !== '') {

      borrarImagen(pathViejo)
    }
  }







  if (tipo == 'basculaOrigen') {
    abasto.viajes[Number(idViaje)].fotoTicketOrigen = nombreArchivo
  } else if (tipo == 'basculaDestino') {
    abasto.viajes[Number(idViaje)].fotoTicketDestino = nombreArchivo
  } else {
    return false
  }
  await abasto.save()
  return true


}

module.exports = {
  actualizarImagen,
  actualizarViaje
}
