/**
 * Created by emyr on 16/02/17.
 */
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var swig = require('swig');

var routes = require('./routes/index');
var app = express();
var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;

// view engine setup
app.engine('swig', swig.renderFile)
app.set('view cache', false);
swig.setDefaults({ cache: false });
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'swig');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(session({
  secret:'notsomuch',
  saveUninitialized : true,
  resave : true,
  unset : 'destroy'
}));
app.use(express.static(path.join(__dirname, './public')));

app.use('/', routes);
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      title: 'error'
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    title: 'error'
  });
});


module.exports = app;
