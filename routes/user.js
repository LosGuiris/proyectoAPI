const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get('/', (req, res, next) => {
    const user = req.session.currentUser._id
    User.findById(user)
    .then(user => {
      console.log(user.username)
      res.render('user/user_profile', {user});
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });

})

router.get('/user/:id', (req, res, next) => {
  const userId = req.params.id;

  User.findById(userId, (err, theUser) => {
    if (err) {
      next(err);
      return;
    }

    res.render('user/user')
  });
});


router.post("/user_profile", (req,res,next) =>{
  const userId = req.session.currentUser;
  const userInfo = {
    gender: req.body.gender,
    allergies: req.body.gender,
    diet: req.body.gender
  };
  
  User.findByIdAndUpdate(userId,userInfo,(err, newUser) => {
    if (err) {
      next(err);
      return;
    }

    req.session.currentUser = theUser;

    res.redirect('/user/user');
  });
});
  


  




module.exports = router;
