const { Router } = require("express");
const User = require("../models/user");
const passport = require("passport");

const signupRouter = Router();
signupRouter.get('/', (req, res) => {
    res.render("signup");
});
signupRouter.post("/", async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    try {
        const user = new User({ username, password, email });
        await user.save();
        res.redirect('login');
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
            res.render("signup", { error: "Username must be unique. This username is already taken.", showLogin: true });
        } else {
            console.log(error);
            res.send(error.message);
        }
    }
})
module.exports=signupRouter;