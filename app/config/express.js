var express = require('express');
var glob = require('glob');
var mongoose = require('mongoose')

var favicon = require('serve-favicon');
var logger = require('morgan');
var session=require("express-session");
var mongoStore = require('connect-mongo')(session);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var compress = require('compression');
var methodOverride = require('method-override');

module.exports = function(app, config) {
  var env = process.env.NODE_ENV || 'development';

  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';
  app.set('views', config.root + '/views');
  app.set('view engine', 'jade');
  app.set('showStackError', true)

  app.locals.pretty = true;

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/../dist'));
  app.use(methodOverride());
  app.use(session({
      secret: 'jingmin',
      store: new mongoStore({
        url: config.db,
        collection: 'sessions'
      }),
      resave: true,
      saveUninitialized: true
    }))

  var controllers = glob.sync(config.root + '/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });

};
