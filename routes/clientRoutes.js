const express = require('express');
const router = express.Router();
const Client = require('../models/clients2'); // Ось тут

// Отримання всіх клієнтів
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Створення нового клієнта
router.post('/', async (req, res) => {
  const client = new Client(req.body);
  try {
    const newClient = await client.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Отримання конкретного клієнта
router.get('/:id', getClient, (req, res) => {
  res.json(res.client);
});

// Оновлення клієнта
router.patch('/:id', getClient, async (req, res) => {
  // Оновлення полів, якщо вони надійшли у запиті
  if (req.body.name != null) {
    res.client.name = req.body.name;
  }
  if (req.body.address != null) {
    res.client.address = req.body.address;
  }
  if (req.body.phone != null) {
    res.client.phone = req.body.phone;
  }
  if (req.body.details != null) {
    res.client.details = req.body.details;
  }
  if (req.body.contactPerson != null) {
    res.client.contactPerson = req.body.contactPerson;
  }

  try {
    const updatedClient = await res.client.save();
    res.json(updatedClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Видалення клієнта
router.delete('/:id', getClient, async (req, res) => {
  try {
    await res.client.remove();
    res.json({ message: 'Клієнт видалено' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware для отримання конкретного клієнта по ID
async function getClient(req, res, next) {
  let client;
  try {
    client = await Client.findById(req.params.id);
    if (client == null) {
      return res.status(404).json({ message: 'Клієнт не знайдено' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.client = client;
  next();
}

module.exports = router;
