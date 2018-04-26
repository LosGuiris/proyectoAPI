const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Plan = require("../models/Plan");
const axios = require("axios");
const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;
const Recipe = require("../models/Recipe")
// Query URL where we will add all variable parameters
let api = `https://api.edamam.com/search?app_id=${app_id}&app_key=${app_key}`;

router.get("/", (req, res, next) => {
  const user = req.session.currentUser._id;
  User.findById(user)
    .then(user => {
      res.render("auth/login", { user });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

router.get("/user", (req, res, next) => {
  const userId = req.session.passport.user;
  User.findById(userId)
    .then(user => {
      res.render("user/user", { user });
    })
    .catch(err => console.log(err));
});

router.get("/user_profile/:id", (req, res, next) => {
  const userI = req.params.id;
  User.findById(userI)
    .then(user => {
      res.render("user/user_profile", { user });
    })
    .catch(err => console.log(err));
});

router.post("/user_profile", (req, res, next) => {
  const user = req.body.id;
  const { gender, allergies, diet, age, height, weight } = req.body;
  const updates = { gender, allergies, diet, age, height, weight };
  User.findByIdAndUpdate(user, updates).then(user => {
    user.gender = req.body.gender;
    user.allergies = req.body.allergies;
    user.diet = req.body.diet;
    user.age = req.body.age;
    user.height = req.body.height;
    user.weight = req.body.weight;
    console.log(user);
    res.render("user/user", { user });
  });
});

router.get("/plan/:id", (req, res, next) => {
  const userId = req.params.id;
  /*const height = req.body.height;
  const age = req.body.age;
  const gender = req.body.gender;
  function getBmr (weight,height,age,gender){
    let bmr = 0;
    if (gender == "male")
	{
		bmr = 66.4730 + (13.7516 * weight) + (5.0033 * (height * 100.0)) - (6.7550 * age);
	}
	else
	{
		bmr = 655.0955 + (9.5634 * weight) + (1.8496 * (height * 100.0)) - (4.6756 * age);
	}
	return bmr;
  }
  const data = getBmr(weight,height,age,gender);*/

  User.findById(userId)
<<<<<<< HEAD
  .populate('recipes')  
  .then(user => {
      console.log
      // Recipe.find().then((recipes)=> {
      //   let filteredRecipes = recipes.filter((recipe) => {
      //     return user.recipes.indexOf(recipe._id) !=-1
      //   })
        res.render("user/plan", { user });
      })
      
    
=======
    .then((user) => {
      res.render("user/plan", { user });
    })
>>>>>>> 54efe12282d00babe135571b5c1d73eb5206ea45
    .catch(err => console.log(err));
});

module.exports = router;
