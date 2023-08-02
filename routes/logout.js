const { Router } = require("express");
const passport = require("passport");

const logoutRouter = Router();
logoutRouter.get('/', function (req, res) {
    req.logOut()
    res.redirect('/');
})

module.exports=logoutRouter;