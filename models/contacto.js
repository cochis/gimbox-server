const { Schema, model } = require('mongoose')
const ContactoSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  business: {
    type: String,
    required: true,
  },
  contactReason: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  
  dateCreated: {
    type: Number,
    required: true,
    default: Date.now(),
  }
  

})

ContactoSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject()
  object.uid = _id
  return object
})
module.exports = model('Contacto', ContactoSchema)
