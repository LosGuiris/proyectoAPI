const express = require("express");
const router = express.Router();
const axios = require("axios");
const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;
const Recipe = require("../models/Recipe");
// Query URL where we will add all variable parameters
let api = `https://api.edamam.com/search?app_id=${app_id}&app_key=${app_key}`;

/* GET search page */
router.get("/", (req, res, next) => {
  res.render("search");
});

/* POST query */
router.post("/", (req, res, next) => {
  // console.log(req.body);
  // Adding q parameter
  if (req.body.name != "") {
    let name = req.body.name;
    // console.log(`name: ${name}`)
    api += `&q=${name}`;
  }
  //  Adding all diet parameters
  if (typeof req.body.diet !== undefined) {
    // console.log(req.body.diet)
    api += multiParams("diet", req.body.diet);
  }
  //  Adding all health parameters
  if (typeof req.body.health !== undefined) {
    // console.log(req.body.health)
    api += multiParams("health", req.body.health);
  }
  //  Adding calories MIN/MAX parameters
  api += minmaxParams("&calories=", req.body.cal_min, req.body.cal_max);
  // Adding preparation time MIN/MAX parameters
  api += minmaxParams("&time=", req.body.t_min, req.body.t_max);

  console.log(`Request URL: ${api}`);
  res.redirect("/search/results");
});

/* GET search result */
router.get("/results", (req, res, next) => {
    axios
      .get(api)
      .then(recipe => {
        // Pushing all results
        let recs = recipe.data.hits;

        recs.forEach(r => {
          const rec = new Recipe({
            label: r.recipe.label,
            image: r.recipe.image,
            source: r.recipe.source,
            url: r.recipe.url,
            dietLabels: r.recipe.dietLabels,
            healthLabels: r.recipe.healthLabels,
            ingredientLines: r.recipe.ingredientLines,
            ingredients: r.recipe.ingredients,
            calories: r.recipe.calories,
            totalTime: r.recipe.totalTime
          })
            .save()
            .catch(e => next(e));
        });
        // console.log(recs)
        api = `https://api.edamam.com/search?app_id=${app_id}&app_key=${app_key}`;
        res.render("search/index", { recs });
      })
      .catch(error => console.log(error));
});

//  Refactored function for both multiple choice parameters
const multiParams = (p_name, p) => {
  let acc = "";
  if (p === undefined) {
    return (p = "");
  } else {
    if (typeof p === "string") {
      return `&${p_name}=${p}`;
    } else if (typeof p === "object") {
      for (let i = 0; i < p.length; i++) {
        acc += `&${p_name}=${p[i]}`;
      }
      return acc;
    }
    return acc;
  }
};
//  Refactored function for both parameters IF chains
const minmaxParams = (par, min, max) => {
  //  IF both are empty
  if (!min && !max) {
    return (par = "");
  }
  //  IF both are not empty
  if (min != "" && max != "") {
    return (par += `${min}-${max}`);
  }
  //  IF MIN is not empty
  if (!min && max === "") {
    return (par += `${min}+`);
  }
  //  IF MAX is not empty
  if (min === "" && !max) {
    return (par += `${max}`);
  }
};

module.exports = router;
