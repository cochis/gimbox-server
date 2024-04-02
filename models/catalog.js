const { Schema, model } = require('mongoose')
const CatalogSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  type: {
    type: String,
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

CatalogSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject()
  object.uid = _id
  return object
})
module.exports = model('Catalog', CatalogSchema)
