const express = require('express');
const router = express.Router();
const Contract = require('../models/contracts2');


// Отримання всіх договорів
router.get('/', async (req, res) => {
  try {
    const contracts = await Contract.find();
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Створення нового договору
router.post('/', async (req, res) => {
  const contract = new Contract(req.body);
  try {
    const newContract = await contract.save();
    res.status(201).json(newContract);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Отримання конкретного договору
router.get('/:id', getContract, (req, res) => {
  res.json(res.contract);
});

// Оновлення договору
router.patch('/:id', getContract, async (req, res) => {
  // Оновлення полів, якщо вони надійшли у запиті
  if (req.body.tradePoint != null) {
    res.contract.tradePoint = req.body.tradePoint;
  }
  if (req.body.client != null) {
    res.contract.client = req.body.client;
  }
  if (req.body.rentalTermInDays != null) {
    res.contract.rentalTermInDays = req.body.rentalTermInDays;
  }

  try {
    const updatedContract = await res.contract.save();
    res.json(updatedContract);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Видалення договору
router.delete('/:id', getContract, async (req, res) => {
  try {
    await res.contract.remove();
    res.json({ message: 'Договір видалено' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware для отримання конкретного договору по ID
async function getContract(req, res, next) {
  let contract;
  try {
    contract = await Contract.findById(req.params.id);
    if (contract == null) {
      return res.status(404).json({ message: 'Договір не знайдено' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.contract = contract;
  next();
}

module.exports = router;
