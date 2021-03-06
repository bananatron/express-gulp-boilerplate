var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
// var Raven = require('raven');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes');
var expressLayouts = require('express-ejs-layouts');
var app = express();


// Must configure Raven before doing anything else with it
// Raven.config('https://XXX@sentry.io/YYY').install();

// The request handler must be the first middleware on the app
// app.use(Raven.requestHandler());

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//app.set('layout', 'layout') // defaults to 'layout'


app.use(favicon(path.join(__dirname, 'public/favicons', 'favicon.ico')));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressLayouts);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler (will print stack)
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler (no stacktraces leaked to user)
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;