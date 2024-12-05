const Message = require('../models/Message')

class MessageController {
  name 
  email 
  subject
  message
  res

  constructor(name, email, subject, message, res) {
    this.name = name
    this.email = email
    this.subject = subject
    this.message = message
    this.res = res
  }

  async send() {
    const message = new Message({
      email: this.email,
      name: this.name,
      subject: this.subject,
      message: this.message,
    })

    try {
      await message.save()
    } catch (err) {
      this.res
        .status(400)
        .send({ message: 'An error occurred while creating the user' })
    } finally {
      this.res.status(201).send({ message: 'Mensagem enviada com sucesso' })
    }
  }

  async delete() {
    try {
      await Message.findByIdAndDelete(this.id)
    } catch (err) {
      this.res.status(500).send({ message: 'Error deleting message' })
    } finally {
      this.res.status(200).send({ message: 'Mensagem deletada com sucesso' })
    }
  }

  async getAll() {
    try {
      const feedbacks = await Message.find({})

      this.res.status(200).send(feedbacks)
    } catch (err) {
      this.res.status(500).send({ message: 'Error retrieving feedbacks' })
    }
  }
}

module.exports = MessageController