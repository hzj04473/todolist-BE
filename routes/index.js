const express = require('express');
const router = express.Router();

const taskApi = require('./task.api');

// tasks 로 들어온다면, taskApi 사용
router.use('/tasks', taskApi);

module.exports = router;
