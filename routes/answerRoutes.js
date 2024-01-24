// answerRoutes.js
const express = require('express');
const router = express.Router();
const Answer = require('../models/answer');

// Отримання всіх відповідей
router.get('/', async (req, res) => {
  try {
    const answers = await Answer.find();
    res.json(answers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Створення нової відповіді
router.post('/', async (req, res) => {
  const answer = new Answer(req.body);
  try {
    const newAnswer = await answer.save();
    res.status(201).json(newAnswer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Оновлення відповіді
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { text, nextQuestionIndex, questionIndex } = req.body;

  try {
    const updatedAnswer = await Answer.findByIdAndUpdate(
      id,
      { text, nextQuestionIndex, questionIndex },
      { new: true }
    );
    res.json(updatedAnswer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Видалення відповіді
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Answer.findByIdAndDelete(id);
    res.json({ message: 'Відповідь видалена' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
