var express = require('express');
const usersRouter = require('./users');
var indexRouter = express.Router();
const ratesRouter = require('./rates');
/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});
indexRouter.get('/markets',function (req,res,next) {
  res.render('markets',{title: 'Markets',layout:'other_layout'})
})
indexRouter.use('/users/',usersRouter);
indexRouter.use('/rates/',ratesRouter);
module.exports = indexRouter;
