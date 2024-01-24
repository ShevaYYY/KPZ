const express = require('express');
const router = express.Router();
const TradePoint = require('../models/tradepoints2');


// Отримання всіх торгівельних пунктів
router.get('/', async (req, res) => {
  try {
    const tradePoints = await TradePoint.find();
    res.json(tradePoints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Створення нового торгівельного пункту
router.post('/', async (req, res) => {
  const tradePoint = new TradePoint(req.body);
  try {
    const newTradePoint = await tradePoint.save();
    res.status(201).json(newTradePoint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Отримання конкретного торгівельного пункту
router.get('/:id', getTradePoint, (req, res) => {
  res.json(res.tradePoint);
});

// Оновлення торгівельного пункту
router.patch('/:id', getTradePoint, async (req, res) => {
  if (req.body.floor != null) {
    res.tradePoint.floor = req.body.floor;
  }
  if (req.body.area != null) {
    res.tradePoint.area = req.body.area;
  }
  if (req.body.hasAirConditioner != null) {
    res.tradePoint.hasAirConditioner = req.body.hasAirConditioner;
  }
  if (req.body.rentCostPerDay != null) {
    res.tradePoint.rentCostPerDay = req.body.rentCostPerDay;
  }

  try {
    const updatedTradePoint = await res.tradePoint.save();
    res.json(updatedTradePoint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Видалення торгівельного пункту
router.delete('/:id', getTradePoint, async (req, res) => {
  try {
    await res.tradePoint.remove();
    res.json({ message: 'Торгівельний пункт видалено' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware для отримання конкретного торгівельного пункту по ID
async function getTradePoint(req, res, next) {
  let tradePoint;
  try {
    tradePoint = await TradePoint.findById(req.params.id);
    if (tradePoint == null) {
      return res.status(404).json({ message: 'Торгівельний пункт не знайдено' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.tradePoint = tradePoint;
  next();
}

module.exports = router;