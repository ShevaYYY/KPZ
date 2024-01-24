// questionRoutes.js
const express = require('express');
const router = express.Router();
const Question = require('../models/question');
const Answer = require('../models/answer');

// Отримання всіх питань
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Створення нового питання
router.post('/', async (req, res) => {
  const question = new Question(req.body);
  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Оновлення тексту питання
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const updatedQuestion = await Question.findByIdAndUpdate(id, { text }, { new: true });
    res.json(updatedQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Видалення питання та пов'язаних відповідей
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Видалення питання
    await Question.findByIdAndDelete(id);

    // Видалення всіх пов'язаних відповідей
    await Answer.deleteMany({ questionIndex: id });

    res.json({ message: 'Питання та пов\'язані відповіді видалені' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
