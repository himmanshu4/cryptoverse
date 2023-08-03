const passport = require("passport");
const LocalStrategy = require('passport-local');
const User = require("../models/user");

passport.use('local', new LocalStrategy(async function verify(username, password, cb) {
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return cb(null, false, { message: "Incorrect username" });
        };
        if (user.password !== password) {
            return cb(null, false, { message: "Incorrect password" });
        };
        return cb(null, user)
    } catch (error) {
        return cb(error);
    }
}));
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    };
});