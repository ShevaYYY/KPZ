const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const tradePointsRoutes = require('./routes/tradePointRoutes');
const clientsRoutes = require('./routes/clientRoutes');
const contractsRoutes = require('./routes/contractRoutes');
const paymentsRoutes = require('./routes/paymentRoutes');

const questionRoutes = require('./routes/questionRoutes');
const answerRoutes = require('./routes/answerRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://sheva:smart1515@atlascluster.fasm4i8.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Помилка підключення до MongoDB:'));
db.once('open', async () => {
  console.log('Підключено до MongoDB!');
});

app.use('/api/tradePoints', tradePointsRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/contracts', contractsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/questions', questionRoutes);
app.use('/answers', answerRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});