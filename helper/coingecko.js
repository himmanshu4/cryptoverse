const { CoinGeckoClient } = require("coingecko-api-v3");
const debug = require('debug')('cryptoverse:rates');
const client = new CoinGeckoClient({
    timeout: 10000,
    autoRetry: true,
});
class CryptoData {
    constructor() {
        this.coinsID = ["bitcoin", "ethereum"];
        this.vsCurrencies = ['usd','eur'];
        this._rates = {};
    }
    get rates() {
        return this._rates;
    }
    set rates(value) {
        this._rates = value;
    }
    refreshRates() {
        client.simplePrice({
            ids: this.coinsID.join(','),
            vs_currencies: this.vsCurrencies.join(',')
        })
            .then((data) => this.rates = data)
            .catch((reason) => debug(reason))
    }
}
const cryptodata = new CryptoData();
//get an immediate value
cryptodata.refreshRates()

//refresh rates continuously periodically
setInterval(
    () => cryptodata.refreshRates(), 3000
);

module.exports = cryptodata;
