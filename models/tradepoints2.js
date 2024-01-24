const mongoose = require('mongoose');

const tradePointSchema = new mongoose.Schema({
  floor: { type: Number, required: true },
  area: { type: Number, required: true },
  hasAirConditioner: { type: Boolean, default: false },
  rentCostPerDay: { type: Number, required: true },
});

const TradePoint = mongoose.model('TradePoint', tradePointSchema);

module.exports = TradePoint;
