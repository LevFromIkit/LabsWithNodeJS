const express = require('express');
const router = express.Router();

// Импорт ваших контроллеров
const userController = require('./userController');
const fileController = require('./fileController');

// Определение маршрутов
router.post('/login', userController.login);
router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);
router.post('/users/:token', userController.updatePassword);
router.get('/users/:name', userController.getUser);
router.delete('/users/:id', userController.deleteUser);
router.get('/users/token/:token', userController.genUserToken);

module.exports = router;