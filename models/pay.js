const { Schema, model } = require('mongoose')
const PaySchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Usuario"
  },
  area: {
    type: Schema.Types.ObjectId,
    ref: "Catalog",
    required: true
  },
  plan: {
    type: Schema.Types.ObjectId,
    ref: "Plan",
    required: true
  },
  startDay: {
    type: Number,
    required: true,
  },
  endDay: {
    type: Number,
    required: true,
  },
  onCount: {
    type: Number

  },
  discount: {
    type: Number

  },
  authorizedBy: {
    type: Schema.Types.ObjectId,
    ref: "Usuario"
  },

  payed: {
    type: Boolean

  },

  userCreated: {
    type: Schema.Types.ObjectId,
    ref: "Usuario"
  },
  activated: {
    type: Boolean,
    default: true
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
  }


})

PaySchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject()
  object.uid = _id
  return object
})
module.exports = model('Pay', PaySchema)
