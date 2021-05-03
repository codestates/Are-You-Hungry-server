require("dotenv").config();
const express = require("express");
const router = express.Router();
const Models = require("../../../models");
const { Op } = require("sequelize");

router.post("/", (req, res) => {
  let { id, username } = res.local;
  Models.User.findOne({
    where: { id, username },
  })
    .then((rst) => {
      if (rst.dataValues) {
        res.status(200).end("password");
      }
    })
    .catch((err) => {
      res.status(200).send("invalid user");
    });
});

router.patch("/", (req, res) => {
  let { id, username } = res.local;
  Models.User.findOne({
    where: { id, username },
  })
    .then((rst) => {
      if (rst.dataValues) {
        res.status(200).end("password");
      }
    })
    .catch((err) => {
      res.status(200).send("invalid user");
    });
});

module.exports = router;
