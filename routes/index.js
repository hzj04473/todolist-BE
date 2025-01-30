const express = require('express');
const router = express.Router();

const taskApi = require('./task.api');
const userApi = require('./user.api');

// tasks 로 들어온다면, taskApi 사용
router.use('/tasks', taskApi);
// user 로 들어온다면, userApi 사용
router.use('/user', userApi);

module.exports = router;
