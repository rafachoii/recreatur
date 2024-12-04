const mongoose = require('mongoose')
const Schema = mongoose.Schema

const feedbackSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
})

const Feedback = mongoose.model('Feedback', feedbackSchema)
module.exports = Feedback