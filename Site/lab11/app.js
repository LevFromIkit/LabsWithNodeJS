const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const file = fs.readFileSync('index.html', 'utf-8');
  res.send(file);
})

mongoose.connect('mongodb://0.0.0.0:27017/api_lab11', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Ограничение количества запросов
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 20, // ограничение 100 запросов в 15 минут
  message: 'Слишком много запросов с вашего IP-адреса, попробуйте снова через 15 минут'
});

app.use(limiter);

// Маршруты
const routes = require('./routes');
app.use('/api', limiter, routes);
//app.use('/api', routes);

// Запуск сервера
app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Произошла внутренняя ошибка сервера' });
});