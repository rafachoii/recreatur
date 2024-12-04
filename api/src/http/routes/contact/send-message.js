const MessageController = require('../../../db/controllers/MessageController')

async function sendMessage(app) {
  app.post('/messages', async (req, res) => {
    const { name, email, phone, message } = req.body

    const messageController = new MessageController(null, name, email, phone, message, res)

    messageController.send()
  })
}

module.exports = sendMessage