const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User