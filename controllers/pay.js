const { response } = require('express')
const bcrypt = require('bcryptjs')
const Pay = require('../models/pay')
const { generarJWT } = require('../helpers/jwt')
//getPays Pay
const getPays = async (req, res) => {
  const [pays, total] = await Promise.all([
    Pay.find({})
      .sort({ dateCreated: -1 }),
    Pay.countDocuments(),
  ])
  res.json({
    ok: true,
    pays,
    uid: req.uid,
    total,
  })
}
const getAllPays = async (req, res) => {
  const [pays, total] = await Promise.all([
    Pay.find({})

      .populate('role', 'nombre clave _id')
      .populate('payCreated', 'nombre apellidoPaterno apellidoMaterno email _id')
      .sort({ nombre: 1 }),
    Pay.countDocuments(),
  ])

  res.json({
    ok: true,
    pays,
    uid: req.uid,
    total,
  })
}

//crearPay Pay
const crearPay = async (req, res = response) => {
  try {
    const pay = new Pay({
      ...req.body
    })
    await pay.save()
    res.json({
      ok: true,
      pay
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}

//actualizarPay Pay
const actualizarPay = async (req, res = response) => {
  //Validar token y comporbar si es el spay

  const uid = req.params.id
  try {
    const payDB = await Pay.findById(uid)
    if (!payDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un pay',
      })
    }
    const { password, google, email, ...campos } = req.body
    if (!payDB.google) {
      campos.email = email
    } else if (payDB.email !== email) {
      return res.status(400).json({
        ok: false,
        msg: 'El pay de Google  no se puede actualizar',
      })
    }

    if (password && password != null && password !== undefined && password !== '') {

      const salt = bcrypt.genSaltSync()

      let pwd = bcrypt.hashSync(password, salt)


      campos.password = pwd
    }


    const payActualizado = await Pay.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      payActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
//Actualizar Pass  Pay
const actualizarPassPay = async (req, res = response) => {
  //Validar token y comporbar si es el spay


  const uid = req.params.id
  try {
    const payDB = await Pay.findById(uid)

    if (!payDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un pay',
      })
    }
    const campos = req.body


    const salt = bcrypt.genSaltSync()
    campos.password = bcrypt.hashSync(campos.password, salt)

    let payDB2 = {
      nombre: payDB.nombre,
      apellidoPaterno: payDB.apellidoPaterno,
      apellidoMaterno: payDB.apellidoMaterno,
      email: payDB.email,
      password: campos.password,
      img: payDB.img,
      role: payDB.role,
      google: payDB.google,
      activated: payDB.activated,
      dateCreated: payDB.dateCreated,
      lastEdited: Date.now(),

    }

    const payActualizado = await Pay.findByIdAndUpdate(uid, payDB2, {
      new: true,
    })
    res.json({
      ok: true,
      payActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}

const isActive = async (req, res = response) => {
  const uid = req.params.id
  try {
    const payDB = await Pay.findById(uid)
    if (!payDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un pay',
      })
    }
    const campos = req.body
    campos.activated = !payDB.activated
    const payActualizado = await Pay.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      payActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}

const getPayById = async (req, res = response) => {

  const uid = req.params.uid
  try {
    const payDB = await Pay.findById(uid)
      .populate('payCreated', 'nombre apellidoPaterno apellidoMaterno email _id')
      .populate('role', 'nombre clave _id')
    if (!payDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un pay',
      })
    }
    res.json({
      ok: true,
      pay: payDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const getPayByUser = async (req, res = response) => {
  const uid = req.params.uid

  try {
    const payDB = await Pay.find({ user: uid })
      .populate('user')
      .populate('plan')
      .populate('area')


    if (!payDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un pay',
      })
    }
    res.json({
      ok: true,
      pays: payDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const getPayByCreatedUid = async (req, res = response) => {
  const user = req.params.user

  try {
    const payDB = await Pay.find({ payCreated: user })

      .populate('role', 'nombre clave _id')


    if (!payDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un pay',
      })
    }

    res.json({
      ok: true,
      pays: payDB,
    })
  } catch (error) {
    console.log('error::: ', error);
    res.status(500).json({
      ok: false,
      error: error,
      msg: 'Error inesperado',
    })
  }
}
const getPayByEmail = async (req, res = response) => {
  const email = req.params.email

  try {
    const payDB = await Pay.find({ email: email })

      .populate('role', 'nombre clave _id')



    if (!payDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un pay',
      })
    }

    res.json({
      ok: true,
      pays: payDB,
    })
  } catch (error) {
    console.log('error::: ', error);
    res.status(500).json({
      ok: false,
      error: error,
      msg: 'Error inesperado',
    })
  }
}


module.exports = {
  getPays,
  crearPay,

  actualizarPay,
  isActive,
  getPayById,
  getAllPays,
  actualizarPassPay,
  getPayByCreatedUid,
  getPayByEmail,
  getPayByUser
}
