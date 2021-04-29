const express = require("express");
const server = express();
const cors = require("cors");
const app = require("./con/index");

server.use(cors());

const PORT = 4000;

server.use("/", app);

server.listen(PORT, () => {
  console.log(`서버가 ${PORT}번에서 작동중입니다.`);
});
