const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const PORT = 4000;

app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번에서 작동중입니다.`);
});