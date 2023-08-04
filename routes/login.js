const { Router } = require("express");
const passport = require("passport");

const loginRouter = Router();
loginRouter.get('/', function (req, res) {
    res.render("login")
})
loginRouter.post("/",
    passport.authenticate("local", { failureRedirect: "/login", keepSessionInfo: true }),
    (req, res) => {
        let url = req.cookies.afterLogin ?? '/';
        res.clearCookie('afterLogin');
        res.redirect(url);
    })
module.exports = loginRouter;