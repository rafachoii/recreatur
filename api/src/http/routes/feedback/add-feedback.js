const FeedbackController = require('../../../db/controllers/FeedbackController')

async function addFeedback(app) {
  app.post('/feedbacks', async (req, res) => {
    try {
      const { username, comment } = req.body

      const feedbackController = new FeedbackController(null, username, comment, res)

      feedbackController.store()
    } catch (e) {
      console.log('Erro', e)
    }
  })
}

module.exports = addFeedback