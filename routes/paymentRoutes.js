const express = require('express');
const router = express.Router();
const Payment = require('../models/payments2');

// Отримання всіх платежів
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Створення нового платежу
router.post('/', async (req, res) => {
  const payment = new Payment(req.body);
  try {
    const newPayment = await payment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Отримання конкретного платежу
router.get('/:id', getPayment, (req, res) => {
  res.json(res.payment);
});

// Оновлення платежу
router.patch('/:id', getPayment, async (req, res) => {
  // Оновлення полів, якщо вони надійшли у запиті
  if (req.body.contract != null) {
    res.payment.contract = req.body.contract;
  }
  if (req.body.paymentAmount != null) {
    res.payment.paymentAmount = req.body.paymentAmount;
  }
  if (req.body.paymentDate != null) {
    res.payment.paymentDate = req.body.paymentDate;
  }

  try {
    const updatedPayment = await res.payment.save();
    res.json(updatedPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Видалення платежу
router.delete('/:id', getPayment, async (req, res) => {
  try {
    await res.payment.remove();
    res.json({ message: 'Платіж видалено' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware для отримання конкретного платежу по ID
async function getPayment(req, res, next) {
  let payment;
  try {
    payment = await Payment.findById(req.params.id);
    if (payment == null) {
      return res.status(404).json({ message: 'Платіж не знайдено' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.payment = payment;
  next();
}

module.exports = router;
