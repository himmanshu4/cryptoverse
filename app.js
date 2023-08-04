var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
const session = require('express-session');
const passport = require('passport');
const dbCheck=require('./db/mongoconect');
var cookieParser = require('cookie-parser');
const { error } = require('console');
var app = express();

//cookie setup
app.use(cookieParser())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(dbCheck());
require("./helper/passport-setup")

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//passport setup
app.use(session({secret:process.env.SESSION_SECRET,resave:false,saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session({pauseStream:true}))

//routing
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
