require("dotenv").config();
const express = require("express");
const router = express.Router();
const { verify } = require("jsonwebtoken");
const { route } = require("../search");
const Models = require("../../models");
const { Op } = require("sequelize");
const ACCESS_SECRET = process.env.ACCESS_SECRET;

router.get("/likes*", (req, res) => {
  const authorization = req.headers["authorization"].split(" ")[1];
  try {
    let { id, username } = verify(authorization, ACCESS_SECRET);
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
  } catch {
    res.status(200).send("invalid access token");
  }
});

router.get("/uploaded*", (req, res) => {
  const authorization = req.headers["authorization"].split(" ")[1];
  try {
    let { id, username } = verify(authorization, ACCESS_SECRET);
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
  } catch {
    res.status(200).send("invalid access token");
  }
});

router.get("/", (req, res) => {
  const authorization = req.headers["authorization"].split(" ")[1];
  try {
    let { id, username } = verify(authorization, ACCESS_SECRET);
    Models.User.findOne({
      where: { id, username },
    })
      .then((rst) => {
        if (rst.dataValues) {
          res.status(200).end("get userinfo");
        }
      })
      .catch((err) => {
        res.status(200).send("invalid user");
      });
  } catch {
    res.status(200).send("invalid access token");
  }
});

router.patch("/", (req, res) => {
  const authorization = req.headers["authorization"].split(" ")[1];
  try {
    let { id, username } = verify(authorization, ACCESS_SECRET);
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
  } catch {
    res.status(200).send("invalid access token");
  }
});

router.delete("/", (req, res) => {
  const authorization = req.headers["authorization"].split(" ")[1];
  try {
    let { id, username } = verify(authorization, ACCESS_SECRET);
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
  } catch {
    res.status(200).send("invalid access token");
  }
  res.status(200).end("delete userinfo");
});

router.patch("/password", (req, res) => {
  const authorization = req.headers["authorization"].split(" ")[1];
  try {
    let { id, username } = verify(authorization, ACCESS_SECRET);
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
  } catch {
    res.status(200).send("invalid access token");
  }
});

router.post("/recipe", (req, res) => {
  const authorization = req.headers["authorization"].split(" ")[1];
  try {
    let { id, username } = verify(authorization, ACCESS_SECRET);
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
  } catch {
    res.status(200).send("invalid access token");
  }
});

router.patch("/recipe", (req, res) => {
  const authorization = req.headers["authorization"].split(" ")[1];
  try {
    let { id, username } = verify(authorization, ACCESS_SECRET);
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
  } catch {
    res.status(200).send("invalid access token");
  }
});

module.exports = router;
