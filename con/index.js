require("dotenv").config();
const express = require("express");
const router = express.Router();
const user = require("./user/index");
const search = require("./search/index");
const auth = require("./auth");
const crypto = require("crypto");
const { sign, verify } = require("jsonwebtoken");
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const Models = require("../models"); //{  Food_info, Food_type, Igr, Igr_cap, Igr_type, Ingredient, Nation, Recipe, User, like, }
const { Op } = require("sequelize"); //{Op , ...}
router.use("/user", auth, user);
router.use("/search", auth, search);
router.get("/signout", auth, function (req, res) {
  let { id, username } = res.locals;
  Models.User.findOne({
    where: { id, username },
  })
    .then((rst) => {
      if (rst.dataValues) {
        //          res.clearCookie("refreshToken");
        res.status(200).send("signout");
      } else {
        res.status(400).send("signout fail");
      }
    })
    .catch((err) => {
      res.status(400).send("signout fail");
    });
});

router.get(
  "/",
  (req, res, next) => {
    console.log(res.locals);
    res.locals.test = { id: 1, test: "test" };
    next();
  },
  (req, res) => {
    console.log(res.locals);
    console.log(res.locals.test);
    res.status(200).send("Hello World");
  }
);

router.post("/signin", (req, res) => {
  let { username } = req.body,
    check = 0;
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
            let { id, username, email, phone, userimage, createdAt } = ans;
            // 난수 추가할것
            const accesstoken = sign(
              { id, username, hash: "test" },
              ACCESS_SECRET,
              {
                expiresIn: "10m",
              }
            );
            // const refreshtoken = sign(
            //   { id, username, hash: "test" },
            //   REFRESH_SECRET,
            //   {
            //     expiresIn: "24h",
            //   }
            // );
            // res.append("Set-Cookie", `refreshToken=${refreshtoken};`);
            res.status(200).json({
              data: {
                accessToken: accesstoken,
                userinfo: { username, email, phone, userimage, createdAt },
              },
              message: "ok",
            });
          } else {
            res
              .status(401)
              .json({ data: null, message: "not exist", status: check });
          }
        }
      );
    })
    .catch((err) => {
      res.status(401).json({ data: null, message: "not exist", status: check });
    });
});

router.post("/signup", (req, res) => {
  try {
    crypto.randomBytes(64, (err, buf) => {
      crypto.pbkdf2(
        req.body.password,
        buf.toString("base64"),
        120900,
        64,
        "sha512",
        (err, key) => {
          Models.User.findOne({ where: { username: req.body.username } }).then(
            (rst) => {
              if (rst === null) {
                Models.User.create({
                  username: req.body.username,
                  password: key.toString("base64"),
                  password2: buf.toString("base64"),
                  email: req.body.email,
                  phone: req.body.phone,
                  userimage: req.body.userimage ? req.body.userimage : "",
                }).then((rst) => {
                  res.status(201).send("signup");
                });
              }
            }
          );
        }
      );
    });
  } catch {
    res.status(400).send("no signup");
  }
});

module.exports = router;
