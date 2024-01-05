const express = require('express');
const usersRouter = express.Router();
const controllers = require('../controllers/usersControllers');

usersRouter.post('/users', controllers.createUser);

usersRouter.get('/users', controllers.getAllUsers);

usersRouter.get('/users/:id', controllers.getUserById);

usersRouter.put('/users/:id', controllers.updateUser);

usersRouter.delete('/users/:id', controllers.deleteUser);

module.exports = usersRouter;