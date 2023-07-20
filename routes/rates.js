const { CoinGeckoClient } = require("coingecko-api-v3");
const { Router } = require("express");
const client = new CoinGeckoClient({
  timeout: 10000,
  autoRetry: true,
});
const ratesRouter = Router()
ratesRouter.get("/",
  async (req, res) => {
    try {
      const data = await client.coinList()
      res.render('rates', { coin: data })
    } catch (error) {
      console.log(error)
      res.send("Server Error")
    }

  }
)
module.exports = ratesRouter