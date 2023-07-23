var express = require('express');
const usersRouter = require('./users');
var indexRouter = express.Router();
const ratesRouter = require('./rates');
const transactionRouter = require('./transaction');
/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});
indexRouter.get('/login',function(req,res){
  res.send('logged in');
})
indexRouter.get('/markets',function (req,res,next) {
  res.render('markets',{title: 'Markets',layout:'other_layout'})
})
indexRouter.use('/users/',usersRouter);
indexRouter.use('/rates/',ratesRouter);
indexRouter.use('/transaction',transactionRouter);
module.exports = indexRouter;
