const express = require("express");
const router = express.Router();
const axios = require("axios");
const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;
const api = [
  `https://api.edamam.com/search?app_id=${app_id}&app_key=${app_key}`
];

/* GET search page */
router.get("/", (req, res, next) => {
  res.render("search");
});

/* POST query */
router.post("/", (req, res, next) => {
  console.log(req.body);

  let name = req.body.name;
  name != "" ? api.push(`&q=${name}`) : null;

  let diet = req.body.diet;
  if (diet.length != 0) {
    for (let i = 0; i < diet.length; i++) {
      if (diet[i] != "") {
        api.push(`&diet=${diet[i]}`);
      }
    }
  }
  let health = req.body.health;
  if (health.length != 0) {
    for (let i = 0; i < health.length; i++) {
      if (health[i] != "") {
        api.push(`&health=${health[i]}`);
      }
    }
  }

  let cal = "&calories=";
  let cal_min = req.body.cal_min;
  let cal_max = req.body.cal_max;
  //  IF both are empty
  if (cal_min.length === 0 && cal_max.length === 0) {
    cal = "";
  }
  //  IF both are not empty
  if (cal_min.length != 0 && cal_max.length != 0) {
    cal += `${cal_min}-${cal_max}`;
  }
  //  IF MIN is not empty
  if (cal_min.length != 0 && cal_max.length === 0) {
    cal += `${cal_min}+`;
  }
  //  IF MAX is not empty
  if (cal_min.length === 0 && cal_max.length != 0) {
    cal += `${cal_max}`;
  }
  //  We push the result to URL
  api.push(cal);

  let t = "&time=";
  let t_min = req.body.t_min;
  let t_max = req.body.t_max;
  // IF both are empty
  if (t_min.length === 0 && t_max.length === 0) {
    t = "";
  }
  // IF both are not empty
  if (t_min.length != 0 && t_max.length != 0) {
    t += `${t_min}-${t_max}`;
  }
  // IF MIN is not empty
  if (t_min.lenth != 0 && t_max.length === 0) {
    t += `${t_min}+`;
  }
  // IF MAX is not empty
  if (t_min.length === 0 && t_max.lenth != 0) {
    t += `${t_max}`;
  }
  // We push the result to URL
  api.push(t);

  
  console.log(api.join(""))
});

/* GET search result */
router.get("/search:results", (req, res, next) => {
  axios
    .get(api)
    .then(recipe => {
      const name = recipe.data.hits[0].recipe.label;
      const diet = recipe.data.hits[0].recipe.dietLabels;
      const health = recipe.data.hits[0].recipe.healthLabels;

      res.render("index", { name, diet, health });
      console.log(recipe.data.hits[0].recipe.label);
    })
    .catch(e => console.log(e));
  //res.render('index');
});

module.exports = router;