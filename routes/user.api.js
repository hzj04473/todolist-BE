const express = require('express');
const router = express.Router();
const userConroller = require('../controller/user.controller');

// 회원가입
router.post('/', userConroller.createUser);

// 로그인
router.post('/login', userConroller.loginWithEmail);

module.exports = router;
