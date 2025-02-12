# todolist-BE

## 0212 BE

- 검색 작업 완료
- 제미니 프롬프트 문장 수정
- 검색시 작성자 안 나오는 문제 수정
- user 테이블 author index 추가
- task 제목 index 추가

## 0210 BE

- 회원정보 수정
- 회원정보 수정 시 비밀번호 체크 맞으면 수정작업 가능 하게...

## 0205 BE

- 로그아웃 처리 완료

## 0204 BE

- populate : JOIN과 비슷한.
- 미들웨어 (사용자 Id)

## 0203 BE

- 할일에 대한 시작일과 종료일 DB 저장
- 할일 내용에 대한 동기유발 문구 제미니 API 연결 완료
- 할일 리스트 SORT 기능 추가 (일자빠른순으로,완료되면 뒤로...)

## 0131 BE

- TODO LIST 일자 DueDate 컬럼 생성
  - Model/Task.js 스키마 수정
  - Controller/task.controller createTask 수정
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
