const express = require('express');
const router = express.Router();
const taskController = require('../controller/task.controller');
const authController = require('../controller/auth.controller');

router.post('/', authController.authenticate, taskController.createTask);

router.get('/', taskController.getTask);

router.put('/:id', taskController.updateTask);

router.delete('/:id', taskController.deleteTask);

module.exports = router;
