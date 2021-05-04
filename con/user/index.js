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
                  let { food_id, food_name, food_img } = x.dataValues;
                  return { food_id, food_name, food_img };
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

router.post("/like", (req, res) => {
  const authorization = req.headers["authorization"].split(" ")[1];
  try {
    let { id, username } = verify(authorization, ACCESS_SECRET);
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
  } catch {
    res.status(200).send("invalid access token");
  }
  // res.status(200).end("get likes");
  // res.status(500).send("err");
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
                  },
                ],
                where: { username: value },
              }).then((rst) => {
                let result = rst[0].dataValues.Food_infos.map((x) => {
                  let { food_id, food_name, food_img } = x.dataValues;
                  return { food_id, food_name, food_img };
                });
                res.status(200).json({ data: result, message: "0k" });
              });
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
