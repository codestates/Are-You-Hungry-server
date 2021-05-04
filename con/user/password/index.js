require("dotenv").config();
const express = require("express");
const router = express.Router();
const Models = require("../../../models");
const { Op } = require("sequelize");
const crypto = require("crypto");

router.post("/", (req, res) => {
  let { id, username } = res.local;
  Models.User.findOne({
    where: { id, username },
  })
    .then((ans) => {
      if (ans.dataValues) {
        crypto.pbkdf2(
          req.body.password,
          ans.dataValues.password2,
          120900,
          64,
          "sha512",
          (err, key) => {
            if (ans.dataValues.password === key.toString("base64")) {
              res.status(200).json({
                message: "ok",
              });
            } else {
              res.status(401).json({ message: "fail" });
            }
          }
        );
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
    .then((ans) => {
      if (ans.dataValues) {
        crypto.randomBytes(64, (err, buf) => {
          crypto.pbkdf2(
            req.body.password,
            buf.toString("base64"),
            120900,
            64,
            "sha512",
            (err, key) => {
              Models.User.update(
                {
                  password: key.toString("base64"),
                  password2: buf.toString("base64"),
                },
                {
                  where: {
                    [Op.and]: [
                      { id: ans.dataValues.id },
                      { username: ans.dataValues.username },
                    ],
                  },
                }
              )
                .then((rst) => {
                  res.status(200).json({ message: "ok" });
                })
                .catch((err) => {
                  res.status(200).send("fail");
                });
            }
          );
        });
      }
    })
    .catch((err) => {
      res.status(200).send("invalid user");
    });
});

module.exports = router;
