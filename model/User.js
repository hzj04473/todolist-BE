const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// token 발급을 위한 JWT 패키지
const jwt = require('jsonwebtoken');

// 환경변수 연결
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// password 는 언제나 삭제
userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  return obj;
};

// JWT 및 유효기간 (1일 = 1d, 2일 = 2d)
// JWT 로그인 토큰 생성
userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: '1d',
  });
  return token;
};

const User = mongoose.model('user', userSchema);

module.exports = User;
