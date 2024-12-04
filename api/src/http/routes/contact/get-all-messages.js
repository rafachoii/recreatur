const MessageController = require('../../../db/controllers/MessageController')

async function getAllMessages(app) {
  app.get('/messages', async (req, res) => {
    try {
      const messageController = new MessageController(...Array(5), res)

      const messages = await messageController.getAll()

      return res.status(200).send({ messages })
    } catch (err) {
      throw new Error('Error at filtering event', err)
    }
  })
}

module.exports = getAllMessages