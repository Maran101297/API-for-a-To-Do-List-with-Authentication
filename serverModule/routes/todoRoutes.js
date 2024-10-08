// taskRouter.js
const express = require('express');
const todoController = require('../controllers/todoController');
const taskRouter = express.Router();
const { protect } = require('../middlewares/authMiddleware');

taskRouter.post('/createTask', protect, todoController.createTask);

taskRouter.get('/showdata', protect, todoController.showTask);

taskRouter.put('/:id', protect, todoController.updateTask);


taskRouter.delete('/:id', protect, todoController.deleteTask);

module.exports = taskRouter;
