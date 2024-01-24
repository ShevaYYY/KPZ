const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  tradePoint: { type: mongoose.Schema.Types.ObjectId, ref: 'TradePoint', required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  rentalTermInDays: { type: Number, required: true },
});

const Contract = mongoose.model('Contract', contractSchema);

module.exports = Contract;
