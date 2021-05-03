require("dotenv").config();
const express = require("express");
const router = express.Router();
const Models = require("../../models");
const { Op } = require("sequelize");
const likes_router = require("./likes/index");
const password_router = require("./password/index");
const recipe_router = require("./recipe/index");

router.use("/likes", likes_router);
router.use("/password", password_router);
router.use("/recipe", recipe_router);

router.get("/uploaded*", (req, res) => {
  let { id, username } = res.local;
  Models.User.findOne({
    where: { id, username },
  })
    .then((rst) => {
      if (rst.dataValues) {
        res.status(200).end("get uploaded");
      }
    })
    .catch((err) => {
      res.status(200).send("invalid user");
    });
});

router.get("/", (req, res) => {
  let { id, username } = res.local;
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
        res.status(200).send("invalid user");
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
        Models.User.update(
          {
            username: req.body.username,
            phone: req.body.phone,
            email: req.body.email,
            userimage: req.body.userimage,
          },
          {
            where: {
              [Op.and]: [
                { id: rst.dataValues.id },
                { username: rst.dataValues.username },
              ],
            },
          }
        )
          .then((rst) => {
            res.status(200).json({ message: "information updated" });
          })
          .catch((err) => {
            res.status(200).json({ message: "updating fail" });
          });
      }
    })
    .catch((err) => {
      res.status(200).send("invalid user");
    });
});

router.delete("/", (req, res) => {
  let { id, username } = res.local;
  Models.User.findOne({
    where: { id, username },
  })
    .then((rst) => {
      if (rst.dataValues) {
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
              [Op.and]: [
                { id: rst.dataValues.id },
                { username: rst.dataValues.username },
              ],
            },
          }
        )
          .then((rst) => {
            res.clearCookie("refreshToken");
            res.status(200).json({ message: "He (or She)'s gone" });
          })
          .catch((err) => {
            res.status(200).json({ message: "fail" });
          });
      }
    })
    .catch((err) => {
      res.status(200).send("invalid user");
    });
});

module.exports = router;
