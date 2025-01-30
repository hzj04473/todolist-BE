const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// require Router
const indexRoutes = require('./routes/index');

// dotEnv
require('dotenv').config();

const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
// console.log('MONGODB_URI_PROD >>>', MONGODB_URI_PROD);
const app = express();

app.use(bodyParser.json());

app.use(cors());

// Router
// api 주소로 들어온다면, indexRoutes 사용
app.use('/api', indexRoutes);

const mongUrI = MONGODB_URI_PROD;

mongoose
  .connect(mongUrI, {})
  .then(() => {
    // console.log('mongoose connected');
  })
  .catch((err) => {
    console.error('mongoose connection fail:', err);
  });

// 할일을 추가 할수 있다. C /api/tasks post
// 할일 리스트를 볼 수 있다. R /api/tasks get
// 할일에 대해서 끝남 안 끝남 표시를 할수 있다. U /api/tasks/:id put
// 할일을 삭제할 수 있다. D /api/tasks:id delete
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Server is running on port 4000');
});

// #1. 회원가입
// 이메일, 패스워드, 이름 입력
// 받은 정보 저장 (데이더베이스 모텔)
// 패스워드 암호화

// 1. 라우터
// 2. 모델
// 3. 데이터 저장 (이미 가입된 유저 유무,패스워드 암호화)
// 4. 응답.

// #2. 로그인
// 데이터베이스 이메일 패스워드로 유저 확인
// 없다면, 실패 메시지
// 있다면, 유저정보+토큰
// 프론트앤드에서 정보 저장

// 1. 라우터
// 2. 이메일, 패스워드 정보 확인
// 3. 이메일로 유저정보 가져오기
// 4. 디비에 있는 패스워드와 프런트가 보낸 패스워드 비교
// 5. 맞다면... 토큰 발행
// 6. 틀리면... 에러메시지
// 7. 응답... 유저정보 + 토큰
