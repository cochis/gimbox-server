const { Schema, model } = require('mongoose')
const QuoteSchema = Schema({
  first_name: {
    type: String,
    required: true,
  },
business: {
    type: String,
    required: true,
  },
email: {
    type: String,
    required: true,
  },
origin: {
    type: String,
    required: true,
  },
destiny: {
    type: String,
    required: true,
  },
type_merchandise: {
    type: String,
    required: true,
  },
quantity: {
    type: String,
    required: true,
  },
type_service: {
    type: String,
    required: true,
  },
incoterm: {
    type: String,
    required: true,
  },
special_request: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Number,
    required: true,
    default: Date.now(),
  }
  

})

QuoteSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject()
  object.uid = _id
  return object
})
module.exports = model('Quote', QuoteSchema)
