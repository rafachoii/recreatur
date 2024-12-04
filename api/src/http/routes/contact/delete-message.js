const MessageController = require('../../../db/controllers/MessageController')

async function deleteMessage(app) {
  app.delete('/messages/:id', async (req, res) => {
    const { id } = req.params

    const messageController = new MessageController(null, ...Array(4), res)

    messageController.delete()
  })
}

module.exports = deleteMessage