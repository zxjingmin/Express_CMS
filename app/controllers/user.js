
var express = require('express'),
  router = express.Router(),
  validator = require('validator'),
  mongoose = require('mongoose');

var User=mongoose.model('User')

module.exports = function (app) {
  app.use('/user', router);
};

router.get('/register', function (req, res, next) {
   res.render('user/register', {
      title: '用户注册',
      articles: 'articles'
    });
});

router.post('/register', function (req, res, next) {
  var user=new User(req.body.user);
   var errObject=user.validateSync();
  if(errObject){
    console.log("user fail");
    console.log(errObject);
  }
 // if(user.name){
 //    User.findByName(user.name,function(err,_user){
 //    if(err){
 //      next(err)
 //    }
 //   })
 // }

  // user.save(function(err){
  // if(err){
  //     console.log(err)
  //   }
  //   res.send(user._id)
  // })
});


router.get('/checkName', function (req, res, next) {
  if(! req.query.user || ! req.query.user.name){
    res.send({valid:false})
  }
  User.findByName(req.query.user.name,function(err,_user){
    if(err){
      res.send({valid:false})
    }
    valid=(_user==null)
    res.send({"valid":valid})
  })
});

router.get('/checkEmail', function (req, res, next) {
  if(! req.query.user || ! req.query.user.email){
    res.send({valid:false})
  }
  User.findByEmail(req.query.user.email,function(err,_user){
    if(err){
      res.send({valid:false})
    }
    valid=(_user==null)
    res.send({"valid":valid})
  })
});
