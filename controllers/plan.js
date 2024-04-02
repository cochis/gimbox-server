const { response } = require('express')
const bcrypt = require('bcryptjs')
const Plan = require('../models/plan')
const { generarJWT } = require('../helpers/jwt')
//getPlans Plan
const getPlans = async (req, res) => {
  const [plans, total] = await Promise.all([
    Plan.find({})
      .sort({ dateCreated: -1 }),
    Plan.countDocuments(),
  ])
  res.json({
    ok: true,
    plans,
    uid: req.uid,
    total,
  })
}
const getAllPlans = async (req, res) => {
  const [plans, total] = await Promise.all([
    Plan.find({})

      .populate('role', 'nombre clave _id')
      .populate('planCreated', 'nombre apellidoPaterno apellidoMaterno email _id')
      .sort({ nombre: 1 }),
    Plan.countDocuments(),
  ])

  res.json({
    ok: true,
    plans,
    uid: req.uid,
    total,
  })
}

//crearPlan Plan
const crearPlan = async (req, res = response) => {
  try {
    const plan = new Plan({
      ...req.body
    })
    await plan.save()
    res.json({
      ok: true,
      plan
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}

//actualizarPlan Plan
const actualizarPlan = async (req, res = response) => {
  //Validar token y comporbar si es el splan

  const uid = req.params.id
  try {
    const planDB = await Plan.findById(uid)
    if (!planDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un plan',
      })
    }
    const { password, google, email, ...campos } = req.body
    if (!planDB.google) {
      campos.email = email
    } else if (planDB.email !== email) {
      return res.status(400).json({
        ok: false,
        msg: 'El plan de Google  no se puede actualizar',
      })
    }

    if (password && password != null && password !== undefined && password !== '') {

      const salt = bcrypt.genSaltSync()

      let pwd = bcrypt.hashSync(password, salt)


      campos.password = pwd
    }


    const planActualizado = await Plan.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      planActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
//Actualizar Pass  Plan
const actualizarPassPlan = async (req, res = response) => {
  //Validar token y comporbar si es el splan


  const uid = req.params.id
  try {
    const planDB = await Plan.findById(uid)

    if (!planDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un plan',
      })
    }
    const campos = req.body


    const salt = bcrypt.genSaltSync()
    campos.password = bcrypt.hashSync(campos.password, salt)

    let planDB2 = {
      nombre: planDB.nombre,
      apellidoPaterno: planDB.apellidoPaterno,
      apellidoMaterno: planDB.apellidoMaterno,
      email: planDB.email,
      password: campos.password,
      img: planDB.img,
      role: planDB.role,
      google: planDB.google,
      activated: planDB.activated,
      dateCreated: planDB.dateCreated,
      lastEdited: Date.now(),

    }

    const planActualizado = await Plan.findByIdAndUpdate(uid, planDB2, {
      new: true,
    })
    res.json({
      ok: true,
      planActualizado,
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
    const planDB = await Plan.findById(uid)
    if (!planDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un plan',
      })
    }
    const campos = req.body
    campos.activated = !planDB.activated
    const planActualizado = await Plan.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      planActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}

const getPlanById = async (req, res = response) => {

  const uid = req.params.uid
  try {
    const planDB = await Plan.findById(uid)
      .populate('planCreated', 'nombre apellidoPaterno apellidoMaterno email _id')
      .populate('role', 'nombre clave _id')
    if (!planDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un plan',
      })
    }
    res.json({
      ok: true,
      plan: planDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const getPlanByCreador = async (req, res = response) => {
  const creador = req.params.creador

  try {
    const planDB = await Plan.find({ planCreated: creador })
      .populate('planCreated', 'nombre apellidoPaterno apellidoMaterno email _id')
      .populate('role', 'nombre clave _id')


    if (!planDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un plan',
      })
    }
    res.json({
      ok: true,
      plans: planDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const getPlanByCreatedUid = async (req, res = response) => {
  const user = req.params.user

  try {
    const planDB = await Plan.find({ planCreated: user })

      .populate('role', 'nombre clave _id')


    if (!planDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un plan',
      })
    }

    res.json({
      ok: true,
      plans: planDB,
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
const getPlanByEmail = async (req, res = response) => {
  const email = req.params.email

  try {
    const planDB = await Plan.find({ email: email })

      .populate('role', 'nombre clave _id')



    if (!planDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un plan',
      })
    }

    res.json({
      ok: true,
      plans: planDB,
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
  getPlans,
  crearPlan,

  actualizarPlan,
  isActive,
  getPlanById,
  getAllPlans,
  actualizarPassPlan,
  getPlanByCreatedUid,
  getPlanByEmail,
  getPlanByCreador
}
