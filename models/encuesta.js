const { Schema, model } = require('mongoose')
const EncuestaSchema = Schema({
  number: {
    type: String,
    required: true,
  },
description: {
    type: String,
    required: true,
  },
email: {
    type: String,
    required: true,
  },
answer: {
    type: String,
    required: true,
  },

  dateCreated: {
    type: Number,
    
    default: Date.now(),
  }
  

})

EncuestaSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject()
  object.uid = _id
  return object
})
module.exports = model('Encuesta', EncuestaSchema)
