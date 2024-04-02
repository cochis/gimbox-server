const { response } = require('express')
const bcrypt = require('bcryptjs')
const Encuesta = require('../models/encuesta')
const { generarJWT } = require('../helpers/jwt')
//getEncuestas Encuesta
const getEncuestas = async (req, res) => {
   
  const [encuestas, total] = await Promise.all([
    Encuesta.find({})
      .sort({ nombre: 1 })
  ])

  res.json({
    ok: true,
    encuestas,
    uid: req.uid,
    total,
  })
}
 
//crearEncuesta Encuesta
const crearEncuesta = async (req, res = response) => {
 
  const campos = {
    ...req.query 
  }
  try {


    const encuesta = new Encuesta({
      ...campos
    })


    await encuesta.save()


    res.json({
      ok: true,
      encuesta
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}
 
module.exports = {
  getEncuestas,
  crearEncuesta,
   

}
