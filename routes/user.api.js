const express = require('express');
const router = express.Router();
const userConroller = require('../controller/user.controller');
const authController = require('../controller/auth.controller');
// 회원가입
router.post('/', userConroller.createUser);

// 로그인
router.post('/login', userConroller.loginWithEmail);

// 토큰을 통해 유저 id -> 유저 내용 보내주기
// userConroller.getUser 미들웨어
router.get('/me', authController.authenticate, userConroller.getUser);

module.exports = router;
