const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
// require Router
const indexRoutes = require("./routes/index");

// dotEnv
require("dotenv").config();

const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
// console.log('MONGODB_URI_PROD >>>', MONGODB_URI_PROD);
const app = express();

app.use(bodyParser.json());

app.use(cors());

// Router
// api 주소로 들어온다면, indexRoutes 사용
app.use("/api", indexRoutes);

const mongUrI = MONGODB_URI_PROD;

mongoose
  .connect(mongUrI, {})
  .then(() => {
    // console.log('mongoose connected');
  })
  .catch((err) => {
    console.error("mongoose connection fail:", err);
  });

// 할일을 추가 할수 있다. C /api/tasks post
// 할일 리스트를 볼 수 있다. R /api/tasks get
// 할일에 대해서 끝남 안 끝남 표시를 할수 있다. U /api/tasks/:id put
// 할일을 삭제할 수 있다. D /api/tasks:id delete
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Server is running on port 4000");
});
