const FeedbackController = require('../../../db/controllers/FeedbackController')

async function getFeedbacks(app) {
  app.get('/feedbacks', async (req, res) => {
    const feedbackController = new FeedbackController(null, null, null, res)

    feedbackController.getAll()
  })
}

module.exports = getFeedbacks