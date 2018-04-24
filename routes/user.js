const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Plan = require("../models/Plan");
const axios = require("axios");
const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;
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
  const { gender, allergies, diet, age, height, weight, bmi } = req.body;
  const updates = { gender, allergies, diet, age, height, weight, bmi };
  User.findByIdAndUpdate(user, updates).then(user => {
    user.gender = req.body.gender;
    user.allergies = req.body.allergies;
    user.diet = req.body.diet;
    user.age = req.body.age;
    user.height = req.body.height;
    user.weight = req.body.height;
    console.log(user);
    res.render("user/user", { user });
  });
});

router.get("/plan/:id", (req, res, next) => {
  const userId = req.session.passport.user;
  User.findById(userId)
    .then(user => {
      res.render("user/plan", { user });
    })
    .catch(err => console.log(err));
});

module.exports = router;
