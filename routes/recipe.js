const express = require("express");
const mongoose = require("mongoose")
const router = express.Router();
const User = require("../models/User");
const axios = require("axios");
const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;
const Recipe = require("../models/Recipe")

router.get("/save/:id", (req, res, next) => {
  var idRecipe = mongoose.Types.ObjectId(req.params.id);
  User.findOneAndUpdate({_id:req.user.id},{$push: {recipes:idRecipe}})
  .populate('recipes')
  .then( () => {
    res.redirect("/search")
  })
  .catch(e => console.log(e))
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