require("dotenv").config();
const express = require("express");
const router = express.Router();
const user = require("./user/index");
const search = require("./search/index");
const crypto = require("crypto");
const { sign, verify } = require("jsonwebtoken");
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const Models = require("../models"); //{  Food_info, Food_type, Igr, Igr_cap, Igr_type, Ingredient, Nation, Recipe, User, like, }
const Seq = require("sequelize"); //{Op , ...}
router.use("/user", user);
router.use("/search", search);

// crypto.randomBytes(64, (err, buf) => {
//   crypto.pbkdf2(
//     "비밀번호",
//     buf.toString("base64"),
//     100000,
//     64,
//     "sha512",
//     (err, key) => {
//       console.log(key.toString("base64")); // 'dWhPkH6c4X1Y71A/DrAHhML3DyKQdEkUOIaSmYCI7xZkD5bLZhPF0dOSs2YZA/Y4B8XNfWd3DHIqR5234RtHzw=='
//     }
//   );
// });

router.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

router.post("/signin", (req, res) => {
  let { username } = req.body,
    check = 0;
  if (username === undefined) res.status(400).send("오류");
  Models.User.findOne({ where: { username: username } })
    .then((ans) => {
      if (ans !== null) {
        check++;
        return ans.dataValues;
      }
    })
    .then((ans) => {
      crypto.pbkdf2(
        req.body.password,
        ans.password2,
        120900,
        64,
        "sha512",
        (err, key) => {
          if (ans.password === key.toString("base64")) {
            check++;
            let { username } = ans;
            const accesstoken = sign({ username }, ACCESS_SECRET, {
              expiresIn: "10m",
            });
            const refreshtoken = sign({}, REFRESH_SECRET, { expiresIn: "24h" });
            res.append("Set-Cookie", `refreshToken=${refreshtoken};`);
            res
              .status(200)
              .json({ data: { accessToken: accesstoken }, message: "ok" });
          }
        }
      );
    })
    .catch((err) => {
      switch (check) {
        case 0:
          res.status(200).json({ data: null, message: "not exist" });
          break;
        case 1:
          res.status(200).json({ data: null, message: "not authorized" });
          break;
      }
    });
});

router.post("/signup", (req, res) => {
  try {
    crypto.randomBytes(64, (err, buf) => {
      crypto.pbkdf2(
        req.body.password,
        buf.toString("base64"),
        100000,
        64,
        "sha512",
        (err, key) => {
          Models.User.create({
            username: req.body.username,
            password: key.toString("base64"),
            password2: buf.toString("base64"),
            email: req.body.email,
            phone: req.body.phone,
            userimage: req.body.userimage ? req.body.userimage : "",
          });
          res.status(201).send("signup");
          console.log(key.toString("base64"));
        }
      );
    });
  } catch {
    res.status(400).send("no signup");
  }
});

router.get("/signout", (req, res) => {
  res.status(200).send("signout");
});

module.exports = router;
