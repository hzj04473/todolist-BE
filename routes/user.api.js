const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const authController = require('../controller/auth.controller');
// 회원가입
router.post('/', userController.createUser);

// 로그인
router.post('/login', userController.loginWithEmail);

// 토큰을 통해 유저 id -> 유저 내용 보내주기
// userConroller.getUser 미들웨어
router.get('/me', authController.authenticate, userController.getUser);

// 로그아웃
router.post('/logout', authController.authenticate, userController.logoutUser);

// 회원수정
router.post('/edit', authController.authenticate, userController.editUser);

// 회원비밀번호 체크
router.post(
  '/passwordConfirm',
  authController.authenticate,
  userController.editUserPasswordConfirm
);
module.exports = router;
