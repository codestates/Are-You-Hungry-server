require("dotenv").config();
const db = require("./db/connection");
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
for (let i = 0; i < 1; i++) {
  let cmd = `http://211.237.50.150:7080/openapi/${API_KEY}/json/Grid_20150827000000000226_1/${
    1 + i * 1000
  }/${(i + 1) * 1000}`;
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
        let nation_id, type_id;
        let ans = await Nation.findOne({
          where: { id: RECIPE_ID, name: NATION_NM },
        });

        if (ans === null) {
          let p = await Nation.create({ code: NATION_CODE, name: NATION_NM });
          nation_id = p.dataValues.id;
        } else {
          nation_id = ans.dataValues.id;
        }
        ans = await Food_type.findOne({ where: { name: TY_NM } });
        if (ans === null) {
          let p = await Food_type.create({ code: TY_CODE, name: TY_NM });
          type_id = p.dataValues.id;
        } else {
          type_id = ans.dataValues.id;
        }
        ans = await Food_info.findOne({ where: { id: RECIPE_ID } });
        if (ans === null) {
          ans = await Food_info.create({
            user_id: 2,
            food_name: RECIPE_NM_KO,
            summary: SUMRY,
            nation_id,
            type_id,
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
}

for (let i = 0; i <= 7; i++) {
  let cmd = `http://211.237.50.150:7080/openapi/${API_KEY}/json/Grid_20150827000000000227_1/${
    1 + i * 1000
  }/${(i + 1) * 1000}`;
  axios
    .get(cmd)
    .then((res) => res.data)
    .then((res) => {
      return res["Grid_20150827000000000227_1"];
    })
    .then((res) => res.row)
    .then(async (res) => {
      for (let data of res) {
        let { ROW_NUM, RECIPE_ID, IRDNT_NM, IRDNT_CPCTY, IRDNT_TY_NM } = data;
        let igr_id, type_id, cap_id;
        let ans = await Igr_cap.findOne({ where: { cap: IRDNT_CPCTY } });

        if (ans === null) {
          let p = await Igr_cap.create({ cap: IRDNT_CPCTY });
          cap_id = p.dataValues.id;
        } else {
          cap_id = ans.dataValues.id;
        }
        ans = await Igr_type.findOne({ where: { type: IRDNT_TY_NM } });
        if (ans === null) {
          let p = await Igr_type.create({ type: IRDNT_TY_NM });
          type_id = p.dataValues.id;
        } else {
          type_id = ans.dataValues.id;
        }
        ans = await Igr.findOne({ where: { name: IRDNT_NM } });
        if (ans === null) {
          let p = await Igr.create({ name: IRDNT_NM });
          igr_id = p.dataValues.id;
        } else {
          igr_id = ans.dataValues.id;
        }
        ans = await Ingredient.findOne({ where: { id: ROW_NUM } });
        if (ans === null) {
          await Ingredient.create({
            igr_id,
            food_id: RECIPE_ID,
            type_id,
            cap_id,
          });
        }
      }
    });
}

for (let i = 0; i < 4; i++) {
  let cmd = `http://211.237.50.150:7080/openapi/${API_KEY}/json/Grid_20150827000000000228_1/${
    1 + i * 1000
  }/${(i + 1) * 1000}`;
  axios
    .get(cmd)
    .then((res) => res.data)
    .then((res) => {
      return res["Grid_20150827000000000228_1"];
    })
    .then((res) => res.row)
    .then(async (res) => {
      for (let data of res) {
        let {
          RECIPE_ID,
          COOKING_NO,
          COOKING_DC,
          STRE_STEP_IMAGE_URL,
          STEP_TIP,
        } = data;
        let ans = await Recipe.findOne({
          where: { food_id: RECIPE_ID, cooking_no: COOKING_NO },
        });
        if (ans === null) {
          await Recipe.create({
            food_id: RECIPE_ID,
            cooking_no: COOKING_NO,
            cooking_dc: COOKING_DC,
            step_img: STRE_STEP_IMAGE_URL,
            step_tip: STEP_TIP,
          });
        }
      }
    });
}
