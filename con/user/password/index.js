require("dotenv").config();
const express = require("express");
const router = express.Router();
const Models = require("../../../models");
const { Op } = require("sequelize");
const crypto = require("crypto");

router.post("/", (req, res) => {
  let { id } = res.locals;
  Models.User.findOne({
    where: { id: id },
  })
    .then((ans) => {
      crypto.pbkdf2(
        req.body.password,
        ans.dataValues.password2,
        120900,
        64,
        "sha512",
        (err, key) => {
          if (!err && ans.dataValues.password === key.toString("base64")) {
            res.status(200).json({
              message: "ok",
            });
          } else {
            res.status(400).json({ message: "fail" });
          }
        }
      );
    })
    .catch((err) => {
      res.status(400).json({ message: "fail" });
    });
});

router.patch("/", (req, res) => {
  let { id, username } = res.locals;
  crypto.randomBytes(64, (err, buf) => {
    crypto.pbkdf2(
      req.body.password,
      buf.toString("base64"),
      120900,
      64,
      "sha512",
      (err, key) => {
        if (err) {
          res.status(400).send("fail");
        } else {
          Models.User.update(
            {
              password: key.toString("base64"),
              password2: buf.toString("base64"),
            },
            {
              where: {
                [Op.and]: [{ id: id }, { username: username }],
              },
            }
          )
            .then((rst) => {
              res.status(200).json({ message: "ok" });
            })
            .catch((err) => {
              res.status(400).send("fail");
            });
        }
      }
    );
  });
});

module.exports = router;
