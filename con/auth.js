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
const { Op } = require("sequelize"); //{Op , ...}

// router.use("/", (req, res, next) => {
//   let refreshToken = req.cookies.refreshToken;
//   let accessToken =
//     req.headers["authorization"] &&
//     req.headers["authorization"].split(" ").length === 2
//       ? req.headers["authorization"].split(" ")[1]
//       : undefined;
//   if (!refreshToken) {
//     res.status(401).send("Unauthorized");
//   } else {
//     verify(refreshToken, REFRESH_SECRET, (err, decode) => {
//       if (err) {
//         if (err.name === "TokenExpiredError") {
//           res.status(401).send("RefreshToken expired. please signin again ");
//         } else {
//           res.status(401).send("Invalid token. please signin again ");
//         }
//       } else {
//         verify(accessToken, ACCESS_SECRET, (err, decode2) => {
//           if (err) {
//             if (err.name === "TokenExpiredError") {
//               const accessToken = sign(
//                 { id: decode.id, username: decode.username, hash: decode.hash },
//                 ACCESS_SECRET,
//                 {
//                   expiresIn: "10m",
//                 }
//               );
//               res.status(200).json({
//                 data: { accessToken },
//                 message: "give new token",
//               });
//             } else {
//               res.status(401).send("Invalid token. please signin again ");
//             }
//           } else {
//             if (
//               decode.id === decode2.id &&
//               decode.username === decode2.username
//             ) {
//               Models.User.findOne({
//                 where: {
//                   [Op.and]: [{ id: decode.id }, { username: decode.username }],
//                 },
//               })
//                 .then((rst) => {
//                   res.local = { id: decode.id, username: decode.username };
//                   next();
//                 })
//                 .catch((err) => {
//                   res.status(200).send("invalid user");
//                 });
//             } else {
//               res.status(200).send("invalid user");
//             }
//           }
//         });
//       }
//     });
//   }
// });

router.use("/", (req, res, next) => {
  let accessToken =
    req.headers["authorization"] &&
    req.headers["authorization"].split(" ").length === 2
      ? req.headers["authorization"].split(" ")[1]
      : undefined;
  verify(accessToken, ACCESS_SECRET, (err, decode) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        const payload = verify(accessToken, ACCESS_SECRET, {
          ignoreExpiration: true,
        });

        Models.User.findOne({
          where: {
            [Op.and]: [{ id: payload.id }, { username: payload.username }],
          },
        })
          .then((rst) => {
            if (rst.dataValues) {
              const accessToken = sign(
                {
                  id: payload.id,
                  username: payload.username,
                  hash: payload.hash,
                },
                ACCESS_SECRET,
                {
                  expiresIn: "15m",
                }
              );
              res.status(200).json({
                data: { accessToken },
                message: "give new token",
              });
            }
          })
          .catch((err) => {
            res.status(200).send("invalid Token");
          });
      } else {
        res.status(401).send("Unauthorized");
      }
    } else {
      Models.User.findOne({
        where: {
          [Op.and]: [{ id: decode.id }, { username: decode.username }],
        },
      })
        .then((rst) => {
          res.locals = { id: decode.id, username: decode.username };
          //          res.local = { id: decode.id, username: decode.username };
          next();
        })
        .catch((err) => {
          res.status(200).send("invalid user");
        });
    }
  });
});

module.exports = router;
