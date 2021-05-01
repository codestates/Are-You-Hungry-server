const express = require("express");
const server = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = require("./con/index");

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors({ exposedHeaders: "*" }));
server.use(cookieParser());

const PORT = 4000;

server.use("/", app);

server.listen(PORT, () => {
  console.log(`서버가 ${PORT}번에서 작동중입니다.`);
});
