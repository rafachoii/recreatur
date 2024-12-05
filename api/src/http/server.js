const fastify = require('fastify')
const cors = require('@fastify/cors')
const cookie = require('@fastify/cookie')

const mongoose = require('mongoose')

const signUp = require('./routes/auth/sign-up')
const login = require('./routes/auth/login')
const forgotPassword = require('./routes/auth/forgot-password')
const verify = require('./routes/auth/verify')
const me = require('./routes/auth/me')

const deleteMessage = require('./routes/contact/delete-message')
const getMessages = require('./routes/contact/get-all-messages')
const sendMessage = require('./routes/contact/send-message')

const addFeedback = require('./routes/feedback/add-feedback')
const deleteFeedback = require('./routes/feedback/delete-feedback')
const getFeedbacks = require('./routes/feedback/get-feedbacks')

const app = fastify()

const env = require('../utils/env')

mongoose.connect(env.MONGO_URL)
const db = mongoose.connection

db.on('error', err => {
  console.log(err)
})

db.on('open', () => {
  console.log('[MONGOOSE] Connection estabilished')
})

app.register(cors, {
  origin: 'http://127.0.0.1:53277',
  credentials: true,
  allowedHeaders: ['Set-Cookie', 'Content-Type'],
})

app.register(cookie, {
  secret: '',
  hook: 'onRequest'
})

app.register(signUp)
app.register(login)
app.register(forgotPassword)
app.register(verify)
app.register(me)

app.register(deleteMessage)
app.register(getMessages)
app.register(sendMessage)

app.register(addFeedback)
app.register(deleteFeedback)
app.register(getFeedbacks)

app.listen({ port: 3333 }).then(() => {
  console.log('Server is running on port 3333')
})