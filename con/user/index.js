require("dotenv").config();
const express = require("express");
const router = express.Router();
const Models = require("../../models");
const { Op } = require("sequelize");
const likes_router = require("./likes/index");
const password_router = require("./password/index");
const recipe_router = require("./recipe/index");
const uploaded_router = require("./uploaded");

router.use("/likes", likes_router);
router.use("/password", password_router);
router.use("/recipe", recipe_router);
router.use("/uploaded", uploaded_router);

router.get("/", (req, res) => {
  let { id, username } = res.locals;
  Models.User.findOne({
    where: { id, username },
  })
    .then((rst) => {
      if (rst.dataValues) {
        let { username, email, phone, userimage, createdAt } = rst.dataValues;
        res.status(200).json({
          data: {
            userinfo: { username, email, phone, userimage, createdAt },
          },
          meassge: "ok",
        });
      } else {
        res.status(400).send("fail");
      }
    })
    .catch((err) => {
      res.status(400).send("fail");
    });
});

router.patch("/", (req, res) => {
  let { id, username } = res.locals;

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
              Models.User.update(
                {
                  ...req.body,
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
                  res.status(200).json({ message: "information updated" });
                })
                .catch((err) => {
                  res.status(400).send("fail");
                });
            }
          );
        }
      );
    });
  } catch {
    res.status(400).send("fail");
  }
});

router.delete("/", (req, res) => {
  let { id, username } = res.locals;

  Models.User.update(
    {
      username: "Deleted User",
      password: "",
      password2: "",
      phone: "",
      email: "",
      userimage: "",
    },
    {
      where: {
        [Op.and]: [{ id: id }, { username: username }],
      },
    }
  )
    .then((rst) => {
      //            res.clearCookie("refreshToken");
      res.status(200).json({ message: "He (or She)'s gone" });
    })
    .catch((err) => {
      res.status(400).send("fail");
    });
});

module.exports = router;
