const Feedback = require('../models/Feedback');

class FeedbackController {
  async store(req, res) {
    const { name, age, comment } = req.body;

    const feedback = new Feedback({
      name,
      age,
      comment,
    });

    try {
      await feedback.save();
      res.status(201).send({ message: 'Feedback adicionado com sucesso' });
    } catch (err) {
      res.status(400).send({ message: 'An error occurred while creating the feedback', error: err });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      await Feedback.findByIdAndDelete(id);
      res.status(200).send({ message: 'Feedback deletado com sucesso' });
    } catch (err) {
      res.status(500).send({ message: 'Erro ao deletar feedback', error: err });
    }
  }

  async getAll(req, res) {
    try {
      const feedbacks = await Feedback.find();
      res.status(200).send(feedbacks);
    } catch (err) {
      res.status(500).send({ message: 'Erro ao recuperar feedbacks', error: err });
    }
  }
}

module.exports = FeedbackController;