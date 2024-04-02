const { Schema, model } = require('mongoose')
const UsuarioSchema = Schema({
  name: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  telefono: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  dateBirth: {
    type: Number,
  },
  observaciones: {
    type: String,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    required: true
  },
  pays: [
    /*
    {
     type: Schema.Types.ObjectId,
    ref: "Salon", 
    
  }
  */
  ],
  usuarioCreated: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    default: null

  },

  activated: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Number,
    required: true,
    default: Date.now(),
  },
  lastEdited: {
    type: Number,
    required: true,
    default: Date.now(),
  },

})

UsuarioSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject()
  object.uid = _id
  return object
})
module.exports = model('Usuario', UsuarioSchema)