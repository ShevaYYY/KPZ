// const mongoose = require('mongoose');

// const answerSchema = new mongoose.Schema({
//   _id: { type: Number, required: true },
//   text: { type: String, required: true },
//   questionIndex: { type: Number, required: true },
//   nextQuestionIndex: { type: Number },
// });

// // Middleware для генерації _id при створенні нового запису
// answerSchema.pre('save', async function (next) {
//   if (!this._id) {
//     const count = await mongoose.model('Answer').countDocuments({});
//     this._id = count + 1;
//   }
//   next();
// });


// const Answer = mongoose.model('Answer', answerSchema);

// module.exports = Answer;


// const mongoose = require('mongoose');

// const answerSchema = new mongoose.Schema({
//   _id: { type: Number },
//   text: { type: String, required: true },
//   questionIndex: { type: Number, required: true },
//   nextQuestionIndex: { type: Number },
// });

// // Middleware для генерації _id при створенні нового запису
// answerSchema.pre('save', async function (next) {
//   if (!this._id) {
//     // Генерація _id у вигляді числа
//     this._id = Math.floor(Math.random() * 1000) + 1;
//   }
//   next();
// });

// const Answer = mongoose.model('Answer', answerSchema);

// module.exports = Answer;
const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  _id: { type: Number, default: () => Math.floor(Math.random() * 1000) + 1 },
  text: { type: String, required: true },
  questionIndex: { type: Number, required: true },
  nextQuestionIndex: { type: Number },
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
