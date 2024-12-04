const Feedback = require('../models/Feedback')

class FeedbackController {
  id
  username
  comment
  res

  constructor(id, username, comment, res) {
    this.id = id
    this.username = username
    this.comment = comment
    this.res = res
  }

  async store() {
    const feedback = new Feedback({
      username: this.username,
      comment: this.comment,
    })

    try {
      await feedback.save()
    } catch (err) {
      this.res
        .status(400)
        .send({ message: 'An error occurred while creating the user' })
    } finally {
      this.res.status(201).send({ message: 'Feedback adicionado com sucesso' })
    }
  }

  async delete() {
    try {
      await Feedback.findByIdAndDelete(this.id)
    } catch (err) {
      this.res.status(500).send({ message: 'Error deleting news' })
    } finally {
      this.res.status(200).send({ message: 'News deleted successfully' })
    }
  }

  async getAll() {
    try {
      const feedbacks = await Feedback.find({})

      this.res.status(200).send(feedbacks)
    } catch (err) {
      this.res.status(500).send({ message: 'Error retrieving feedbacks' })
    }
  }
}

module.exports = FeedbackController