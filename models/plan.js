const { Schema, model } = require('mongoose')
const PlanSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  area: {
    type: Schema.Types.ObjectId,
    ref: "Catalog",
    required: true
  },
  cost: {
    type: Number,
    required: true,
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

PlanSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject()
  object.uid = _id
  return object
})
module.exports = model('Plan', PlanSchema)
