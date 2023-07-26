const { Router } = require("express");
const passport = require("passport");

const loginRouter = Router();
loginRouter.get('/', function (req, res) {
    res.render("login")
})
loginRouter.post("/",passport.authenticate("local",{failureRedirect:"/login",successRedirect:"/"}))
module.exports=loginRouter;