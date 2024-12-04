const FeedbackController = require('../../../db/controllers/FeedbackController')

async function deleteFeedback(app) {
  app.delete('/feedbacks/:id', async (req, res) => {
    try {
      const { id } = req.params

      const feedbackController = new FeedbackController(id, null, null, res)

      feedbackController.delete()
    } catch (e) {
      console.log('Erro', e)
    }
  })
}

module.exports = deleteFeedback