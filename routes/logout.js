const { Router } = require("express");
const passport = require("passport");
const User = require("../models/user");
const { Transaction } = require("../models/transaction");
const debug = require('debug')('cryptoverse:logout')
const logoutRouter = Router();
logoutRouter.post('/', function (req, res,next) {
    if (req.isAuthenticated()) {
        req.logOut((err)=>err&&debug(err))
        res.send('logged out');
    }
    else res.send('Not Logged In');
})
logoutRouter.post('/forever', function (req, res,next) {
    if (req.isAuthenticated()) {
        const id = req.user._id;
        Transaction.deleteMany({user:id}).exec();
        User.findByIdAndDelete(id).exec();
        req.logOut((err)=>err&&debug(err))
        res.send('Account deleted');
    }
    else res.send('Not Logged In');
})
module.exports = logoutRouter;