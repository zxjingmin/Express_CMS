var express = require('express'),
  router = express.Router(),
  nodemailer=require("nodemailer"),
  mongoose = require('mongoose');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
   res.render('index', {
      title: '首页',
    });
});
