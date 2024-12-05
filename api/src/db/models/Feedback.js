const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    name: String,
    age: Number,
    comment: String,
});

module.exports = mongoose.model('Feedback', feedbackSchema);