require("dotenv").config();
const express = require("express");
const router = express.Router();
const Models = require("../../models");
const { Op } = require("sequelize");

router.get("/likes*", (req, res) => {
  let { id, username } = res.local;
  Models.User.findOne({
    where: { id, username },
  })
    .then((rst) => {
      if (rst.dataValues) {
        try {
          let [type, value] = req.url.split("?")[1].split("=");
          value = decodeURI(value);
          if (type === "username") {
            Models.User.findAll({
              include: [
                {
                  model: Models.Food_info,
                  as: "liked",
                },
              ],
              where: { username: value },
            }).then((rst) => {
              let result = rst[0].dataValues.liked.map((x) => {
                let { food_id, food_name, food_image } = x.dataValues;
                return { food_id, food_name, food_image };
              });
              res.status(200).json({ data: result, message: "0k" });
            });
          } else if (type === "foodname") {
            res.send("end");
          } else {
            res.send("end");
          }
        } catch {
          res.send("end");
        }
      }
    })
    .catch((err) => {
      res.status(200).send("invalid user");
    });
});

router.post("/like", (req, res) => {
  let { id, username } = res.local;
  Models.User.findOne({
    where: { id, username },
  })
    .then((rst) => {
      if (rst.dataValues) {
        res.status(200).end("like");
      }
    })
    .catch((err) => {
      res.status(200).send("invalid user");
    });
});

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
  console.log(id, username);
  Models.User.findOne({
    where: { id, username },
  })
    .then((rst) => {
      if (rst.dataValues) {
        res.status(200).send("get userinfo");
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
        res.status(200).end("update userinfo");
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
        res.clearCookie("refreshToken");
        res.status(200).send("signout");
      }
    })
    .catch((err) => {
      res.status(200).send("invalid user");
    });
});

router.patch("/password", (req, res) => {
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

router.get("/recipe", (req, res) => {
  let { id, username } = res.local;
  res.status(200).end("get recipe");
  res.status(500).send("err");
});

router.post("/recipe", (req, res) => {
  let { id, username } = res.local;
  Models.User.findOne({
    where: { id, username },
  })
    .then((rst) => {
      if (rst.dataValues) {
        res.status(200).end("add recipe");
      }
    })
    .catch((err) => {
      res.status(200).send("invalid user");
    });
});

router.patch("/recipe", (req, res) => {
  let { id, username } = res.local;
  Models.User.findOne({
    where: { id, username },
  })
    .then((rst) => {
      if (rst.dataValues) {
        res.status(200).end("update recipe");
      }
    })
    .catch((err) => {
      res.status(200).send("invalid user");
    });
});

module.exports = router;
