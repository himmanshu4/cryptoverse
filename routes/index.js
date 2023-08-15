var express = require('express');

const usersRouter = require('./users');
var indexRouter = express.Router();
const ratesRouter = require('./rates');
const transactionRouter = require('./transaction');
const loginRouter = require('./login');
const signupRouter = require('./signup');
const logoutRouter = require('./logout');
const apiRouter = require('./api');
const adminRouter = require('./admin');
/* GET home page. */
indexRouter.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

indexRouter.get('/markets', function (req, res, next) {
  res.render('markets', { title: 'Markets' })
})
indexRouter.get('/chart', (req, res) => {
  res.render('chart', { title: 'Charts' })
})
indexRouter.get("/wallet", (req, res) => {
  res.render("wallet", { user: req.user })
})
indexRouter.get("/aboutus", (req, res) => {
  res.render("aboutus")
})
indexRouter.use('/login', loginRouter);
indexRouter.use('/logout', logoutRouter);
indexRouter.use('/signup', signupRouter);
indexRouter.use("/admin/", adminRouter);
indexRouter.use('/users/', usersRouter);
indexRouter.use('/rates/', ratesRouter);
indexRouter.use('/transaction', transactionRouter);
indexRouter.use("/api", apiRouter)
module.exports = indexRouter;
