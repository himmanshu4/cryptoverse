const { Router } = require("express");
const cryptodata = require("../helper/coingecko");

const adminRouter = Router();
adminRouter.use((req, res, next) => {
    if (req.isAuthenticated() && req.user.username == "admin") {
        next()
    }
    else {
        console.log(req.user)
        res.status(401).send("Unauthorized");
    }
})

adminRouter.get("/", (req, res) => {
    res.render("admin",
        {
            coins: cryptodata.allCoins,
            currencies: cryptodata.allCurrencies,
        })
})

adminRouter.post("/", (req, res) => {
    switch (req.body.type) {
        case "coin":
            const newCoinID = req.body.coinID;
            if (cryptodata.addCoin(newCoinID)) {
                res.status(200).send("coin added");
            }
            else {
                res.status(400).send("Coin not Found");
            }
            break;
        case "currency":
            const newCurrency = req.body.currency;
            if (cryptodata.addCurrency(newCurrency)) {
                res.status(200).send("currency added");
            }
            else {
                res.status(400).send("Currency not Found");
            }
    }
})
module.exports=adminRouter;