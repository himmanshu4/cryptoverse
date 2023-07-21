const  cryptodata  = require("../helper/coingecko");
const { Router } = require("express");

const ratesRouter = Router()
ratesRouter.get("/",
  async (req, res) => {
    res.render('rates',{coin:cryptodata.rates})
  }
)
module.exports = ratesRouter