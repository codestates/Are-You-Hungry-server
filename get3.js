require("dotenv").config();
const { Op } = require("sequelize");
const db = require("./db/connection");
const fs = require("fs");
const {
  Food_info,
  Food_type,
  Igr,
  Igr_cap,
  Igr_type,
  Ingredient,
  Nation,
  Recipe,
} = require("./models");
const axios = require("axios");
const API_KEY = process.env.API_KEY;
let cmd = `http://211.237.50.150:7080/openapi/${API_KEY}/json/Grid_20150827000000000226_1/1/1000`;
axios
  .get(cmd)
  .then((res) => res.data)
  .then((res) => {
    return res["Grid_20150827000000000226_1"];
  })
  .then((res) => res.row)
  .then(async (res) => {
    for (let data of res) {
      let {
        RECIPE_ID,
        RECIPE_NM_KO,
        SUMRY,
        NATION_CODE,
        NATION_NM,
        TY_CODE,
        TY_NM,
        COOKING_TIME,
        CALORIE,
        QNT,
        LEVEL_NM,
        IRDNT_CODE,
        PC_NM,
        IMG_URL,
      } = data;

      ans = await Food_info.findOne({ where: { food_id: RECIPE_ID } });
      if (ans === null) {
        ans = await Food_info.create({
          food_id: RECIPE_ID,
          user_id: 2,
          food_name: RECIPE_NM_KO,
          summary: SUMRY,
          nation: NATION_NM,
          type: TY_NM,
          cooking_time: COOKING_TIME,
          calorie: CALORIE,
          qnt: QNT,
          level: LEVEL_NM,
          irdnt_code: IRDNT_CODE,
          price: PC_NM,
          food_img: IMG_URL,
        });
      }
    }
  });

// async function run(a, b) {
//   let cmd = `http://211.237.50.150:7080/openapi/${API_KEY}/json/Grid_20150827000000000227_1/${a}/${b}`;
//   await axios
//     .get(cmd)
//     .then((res) => res.data)
//     .then((res) => {
//       return res["Grid_20150827000000000227_1"];
//     })
//     .then((res) => res.row)
//     .then(async (res) => {
//       for (let data of res) {
//         let { ROW_NUM, RECIPE_ID, IRDNT_NM, IRDNT_CPCTY, IRDNT_TY_NM } = data;
//         ans = await Ingredient.findOne({
//           where: {
//             [Op.and]: [
//               { food_id: RECIPE_ID },
//               { id: ROW_NUM },
//               // { food_id: { [Op.lte]: 573 } },
//             ],
//           },
//         });
//         if (ans === null) {
//           await Ingredient.create({
//             food_id: RECIPE_ID,
//             name: IRDNT_NM,
//             type: IRDNT_TY_NM,
//             cap: IRDNT_CPCTY,
//           });
//         }
//       }
//     });
// }
// async function dod() {
//   await run(1, 1000);
//   await run(1001, 2000);
//   await run(2001, 3000);
//   await run(3001, 4000);
//   await run(4001, 5000);
//   await run(5001, 6000);
//   await run(6001, 7000);
// }
// dod();

// async function run2(a, b) {
//   let cmd = `http://211.237.50.150:7080/openapi/${API_KEY}/json/Grid_20150827000000000228_1/${a}/${b}`;
//   await axios
//     .get(cmd)
//     .then((res) => res.data)
//     .then((res) => {
//       return res["Grid_20150827000000000228_1"];
//     })
//     .then((res) => res.row)
//     .then(async (res) => {
//       for (let data of res) {
//         let {
//           RECIPE_ID,
//           COOKING_NO,
//           COOKING_DC,
//           STRE_STEP_IMAGE_URL,
//           STEP_TIP,
//         } = data;
//         let ans = await Recipe.findOne({
//           where: {
//             [Op.and]: [{ food_id: RECIPE_ID }, { cooking_no: COOKING_NO }],
//           },
//         });
//         if (ans === null) {
//           await Recipe.create({
//             food_id: RECIPE_ID,
//             cooking_no: COOKING_NO,
//             cooking_dc: COOKING_DC,
//             step_img: STRE_STEP_IMAGE_URL,
//             step_tip: STEP_TIP,
//           });
//         }
//       }
//     });
// }

// async function dod2() {
//   await run2(1, 1000);
//   await run2(1001, 2000);
//   await run2(2001, 3000);
//   await run2(3001, 4000);
// }
// dod2();
