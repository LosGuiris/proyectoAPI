const express = require('express');
const router  = express.Router();
const axios = require('axios');
const param = 'pig'
const api = `https://api.edamam.com/search?q=${param}&app_id=55f79323&app_key=f0a1cc676a17a784aa52847e03f81f8b`

/* GET home page */
router.get('/', (req, res, next) => {
  axios.get(api)
  .then(recipe=>{
    const name = recipe.data.hits[0].recipe.label
    res.render('index',{name});
    console.log(recipe.data.hits[0].recipe.label)
  })
  .catch(e=>console.log(e))
  //res.render('index');
});

router.post('/',(req,res,next)=>{
  console.log(req.body.param)
  
  res.render('index')
})


module.exports = router;
