const express = require("express");
const router = express.Router();
const User = require("../models/User");

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
  const { gender, allergies, diet } = req.body;
  const updates = { gender, allergies, diet };
  User.findByIdAndUpdate(user, updates).then(user => {
    user.gender = req.body.gender;
    user.allergies = req.body.allergies;
    user.diet = req.body.diet;
    console.log(user);
    res.render("user/user", { user });
  });
});

module.exports = router;
