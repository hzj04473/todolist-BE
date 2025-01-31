# todolist-BE

## 0131 BE

- bcrypt 설치 - 회원정보 password 암호화
- Model/User.js
  - password 암호화 메소드 추가
  - 쿼리 실행시 password delete 하여, 안 나오게 처리
- Controller/user.controller.js 에서
  - 회원가입시 회원중복 체크하여, 중복 가입 막기
  - 프론트앤드 정보 중 password 와 mongoDB에 있는 암호화 된 password 컬럼과 비교하여 로그인 진행

## 0128 BE

- heroku, cloudtype, aws beanstalk
- DB - Mongodb Altas

## 0127 BE

- mongoDB CURD 기능 사용 - mongDB QUERY 대한 사용감 익혀야 함
- Model, Controller, Route 기능 - 기능 관련 체크 필요
