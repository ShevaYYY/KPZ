const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  details: { type: String },
  contactPerson: { type: String },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;