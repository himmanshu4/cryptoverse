const { Router } = require("express");
const passport = require("passport");

const loginRouter = Router();
loginRouter.get('/', function (req, res) {
    res.render("login")
})
loginRouter.post("/",
    (req, res, next) => {
        console.log(req.cookies)
        next()
    },
    passport.authenticate("local", { failureRedirect: "/login", keepSessionInfo: true }),
    (req, res) => {
        console.log(req.cookies)
        let url = req.cookies.afterLogin ?? '/';
        res.redirect(url);
    })
module.exports = loginRouter;