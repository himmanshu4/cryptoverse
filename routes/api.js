const { Router } = require("express");
const { Transaction } = require("../models/transaction");
const async = require("hbs/lib/async");
const cryptodata = require("../helper/coingecko");

const apiRouter = Router();
const secureEndpoints = ["/transactions", "/portfolio"]
secureEndpoints.forEach(route => apiRouter.use(route, (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    }
    else {
        res.status(401).send("Unauthorized");
    }
}))
apiRouter.get("/transactions", async (req, res) => {
    const transactions = await Transaction.find({ user: req.user.id });
    res.json(transactions);
});
apiRouter.get("/portfolio", (req, res) => {
    const coinBal = req.user.coinBalance;
    res.json({ balance: req.user.balance, coinBal });
})
apiRouter.get("/rates", async (req, res) => {
    res.json(cryptodata.rates);
})
module.exports = apiRouter;