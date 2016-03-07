var express = require('express'),
  router = express.Router(),
  nodemailer=require("nodemailer"),
  mongoose = require('mongoose');

module.exports = function (app) {
  app.use('/acticles', router);
};

router.get('/list', function (req, res, next) {
  var Article = mongoose.model('Article');
  Article.find({},function(err,articles){
      if(err){
        console.log(err)
      }
      res.render('acticles/list', {
      title: '静敏软件工作室',
      articles: articles
    });
  })
})
router.get('/show/:userid', function (req, res, next) {

  var Article = mongoose.model('Article');
  Article.find({_id:req.params.id},function(err,articles){
      if(err){
        console.log(err)
      }
      res.render('acticles/show', {
      title: '静敏软件工作室',
      articles: articles
    });
  })

})

