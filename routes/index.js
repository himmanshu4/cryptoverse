var express = require('express');
const usersRouter = require('./users');
var indexRouter = express.Router();
const ratesRouter = require('./rates');
const transactionRouter = require('./transaction');
const loginRouter = require('./login');
const signupRouter = require('./signup');
/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

indexRouter.get('/markets',function (req,res,next) {
  res.render('markets',{title: 'Markets',layout:'other_layout'})
})
indexRouter.use('/login',loginRouter);
indexRouter.use('/signup',signupRouter);
indexRouter.use('/users/',usersRouter);
indexRouter.use('/rates/',ratesRouter);
indexRouter.use('/transaction',transactionRouter);
module.exports = indexRouter;
