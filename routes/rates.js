const cryptodata = require("../helper/coingecko");
const { Router } = require("express");

const ratesRouter = Router()
ratesRouter.get("/",
  async (req, res) => {
    const vsCurrencies = Array.from(cryptodata.vsCurrencies).map(currency => currency.toUpperCase());
    res.render('rates', { currency: vsCurrencies })
  }
)
module.exports = ratesRouter