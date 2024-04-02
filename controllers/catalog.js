const { response } = require('express')
const bcrypt = require('bcryptjs')
const Catalog = require('../models/catalog')
const { generarJWT } = require('../helpers/jwt')
//getCatalogs Catalog
const getCatalogs = async (req, res) => {
  const [catalogs, total] = await Promise.all([
    Catalog.find({})
      .sort({ dateCreated: -1 }),
    Catalog.countDocuments(),
  ])
  res.json({
    ok: true,
    catalogs,
    uid: req.uid,
    total,
  })
}
const getAllCatalogs = async (req, res) => {
  const [catalogs, total] = await Promise.all([
    Catalog.find({})

      .populate('role', 'nombre clave _id')
      .populate('catalogCreated', 'nombre apellidoPaterno apellidoMaterno email _id')
      .sort({ nombre: 1 }),
    Catalog.countDocuments(),
  ])

  res.json({
    ok: true,
    catalogs,
    uid: req.uid,
    total,
  })
}

//crearCatalog Catalog
const crearCatalog = async (req, res = response) => {
  try {
    const catalog = new Catalog({
      ...req.body
    })
    await catalog.save()
    res.json({
      ok: true,
      catalog
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado...  revisar logs',
    })
  }
}

//actualizarCatalog Catalog
const actualizarCatalog = async (req, res = response) => {
  //Validar token y comporbar si es el scatalog

  const uid = req.params.id
  try {
    const catalogDB = await Catalog.findById(uid)
    if (!catalogDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un catalog',
      })
    }
    const { password, google, email, ...campos } = req.body
    if (!catalogDB.google) {
      campos.email = email
    } else if (catalogDB.email !== email) {
      return res.status(400).json({
        ok: false,
        msg: 'El catalog de Google  no se puede actualizar',
      })
    }

    if (password && password != null && password !== undefined && password !== '') {

      const salt = bcrypt.genSaltSync()

      let pwd = bcrypt.hashSync(password, salt)


      campos.password = pwd
    }


    const catalogActualizado = await Catalog.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      catalogActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
//Actualizar Pass  Catalog
const actualizarPassCatalog = async (req, res = response) => {
  //Validar token y comporbar si es el scatalog


  const uid = req.params.id
  try {
    const catalogDB = await Catalog.findById(uid)

    if (!catalogDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un catalog',
      })
    }
    const campos = req.body


    const salt = bcrypt.genSaltSync()
    campos.password = bcrypt.hashSync(campos.password, salt)

    let catalogDB2 = {
      nombre: catalogDB.nombre,
      apellidoPaterno: catalogDB.apellidoPaterno,
      apellidoMaterno: catalogDB.apellidoMaterno,
      email: catalogDB.email,
      password: campos.password,
      img: catalogDB.img,
      role: catalogDB.role,
      google: catalogDB.google,
      activated: catalogDB.activated,
      dateCreated: catalogDB.dateCreated,
      lastEdited: Date.now(),

    }

    const catalogActualizado = await Catalog.findByIdAndUpdate(uid, catalogDB2, {
      new: true,
    })
    res.json({
      ok: true,
      catalogActualizado,
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
    const catalogDB = await Catalog.findById(uid)
    if (!catalogDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un catalog',
      })
    }
    const campos = req.body
    campos.activated = !catalogDB.activated
    const catalogActualizado = await Catalog.findByIdAndUpdate(uid, campos, {
      new: true,
    })
    res.json({
      ok: true,
      catalogActualizado,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}

const getCatalogById = async (req, res = response) => {

  const uid = req.params.uid
  try {
    const catalogDB = await Catalog.findById(uid)
      .populate('catalogCreated', 'nombre apellidoPaterno apellidoMaterno email _id')
      .populate('role', 'nombre clave _id')
    if (!catalogDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un catalog',
      })
    }
    res.json({
      ok: true,
      catalog: catalogDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const getCatalogByCreador = async (req, res = response) => {
  const creador = req.params.creador

  try {
    const catalogDB = await Catalog.find({ catalogCreated: creador })
      .populate('catalogCreated', 'nombre apellidoPaterno apellidoMaterno email _id')
      .populate('role', 'nombre clave _id')


    if (!catalogDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un catalog',
      })
    }
    res.json({
      ok: true,
      catalogs: catalogDB,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado',
    })
  }
}
const getCatalogByCreatedUid = async (req, res = response) => {
  const user = req.params.user

  try {
    const catalogDB = await Catalog.find({ catalogCreated: user })

      .populate('role', 'nombre clave _id')


    if (!catalogDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un catalog',
      })
    }

    res.json({
      ok: true,
      catalogs: catalogDB,
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
const getCatalogByType = async (req, res = response) => {
  const type = req.params.type

  try {
    const catalogDB = await Catalog.find({ type: type })
    if (!catalogDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No exite un catalogo',
      })
    }

    res.json({
      ok: true,
      catalogs: catalogDB,
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
  getCatalogs,
  crearCatalog,

  actualizarCatalog,
  isActive,
  getCatalogById,
  getAllCatalogs,
  actualizarPassCatalog,
  getCatalogByCreatedUid,
  getCatalogByType,
  getCatalogByCreador
}
