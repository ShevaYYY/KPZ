// const mongoose = require('mongoose');

// const questionSchema = new mongoose.Schema({
//   _id: { type: Number },
//   text: { type: String, required: true },
// });

// const Question = mongoose.model('Question', questionSchema);

// module.exports = Question;


const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  _id: { type: Number },
  text: { type: String, required: true },
});

// Middleware для генерації _id при створенні нового запису
questionSchema.pre('save', async function (next) {
  if (!this._id) {
    // Генерація _id у вигляді числа
    this._id = Math.floor(Math.random() * 1000) + 1;
  }
  next();
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
