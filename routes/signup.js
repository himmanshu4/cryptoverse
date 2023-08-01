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
        console.log(await user.validate());
        const result = await user.save();
        res.redirect("/transaction")
    } catch (error) {
        res.send(error)
    }
})
module.exports=signupRouter;