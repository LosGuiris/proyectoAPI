const express = require("express");
const router = express.Router();
const User = require("../models/User");
const axios = require("axios");
const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;
const Recipe = require("../models/Recipe")

router.get("/save", (req, res, next) => {
  const url = req.query.id;
  console.log(req.user.id)
  User.findOneAndUpdate({_id:req.user.id}, {$push:{recipes:url}})
  .then( () => {
    res.redirect("/search")
  })
})
router.get("/:label", (req,res, next) => {
  const url = req.query.id;
  Recipe.findOne({label:req.params.label})
  .then((recipe) => {
    res.render("recipe/recipe",{recipe, url});
  })
  .catch(err => {
    next();
    return err;
  });
})

module.exports = router;