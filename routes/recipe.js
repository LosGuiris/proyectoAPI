const express = require("express");
const router = express.Router();
const User = require("../models/User");
const axios = require("axios");
const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;
const Recipe = require("../models/Recipe")

router.get("/:label", (req,res, next) => {
  Recipe.findOne({label:req.params.label})
  .then((recipe) => {
    console.log(recipe)
    res.render("recipe/recipe",{recipe});
  })
  .catch(err => {
    next();
    return err;
  });
})
router.post("/save", (req, res, next) => {
  let id = req.session.currentUser.id
})

module.exports = router;