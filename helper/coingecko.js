const { CoinGeckoClient } = require("coingecko-api-v3");
const debug = require('debug')('cryptoverse:rates');
const client = new CoinGeckoClient({
    timeout: 10000,
    autoRetry: true,
});
class CryptoData {
    #refreshID
    /**
     * 
     * @param {String[]} coins 
     * @param {String[]} vsCurrencies 
     */
    constructor(coins=null,vsCurrencies=null) {
        this.coinsID = new Set(coins??["bitcoin", "ethereum"]); // Use Set to ensure unique values
        this.vsCurrencies = new Set(vsCurrencies??['usd', 'eur']);
        this._rates = {};
        client.coinList().then(data => this.allCoins = data);
        client.simpleSupportedCurrencies().then(data => this.allCurrencies = data)
    }
    get rates() {
        return this._rates;
    }
    set rates(value) {
        this._rates = value;
    }
    set refreshRate(t) {
        if (this.#refreshID) clearInterval(this.#refreshID)
        this.#refreshID = setInterval(() => this.refreshRates(), t)
    }
    refreshRates() {
        client.simplePrice({
            ids: [...this.coinsID].join(','), // Convert Set back to an array before joining
            vs_currencies: [...this.vsCurrencies].join(',')
        })
            .then(data => this.rates = data)
            .catch((reason) => debug(reason))
    }
    /**
     * 
     * @param {String} newCoinID id of new coin to be added
     * @returns true if coin is added else false
     */
    addCoin(newCoinID) {
        if (this.allCoins.find(coin => coin.id == newCoinID)) {
            this.coinsID.add(newCoinID);
            this.refreshRates();
            return true;
        }
        else return false;
    }
    /**
     * Add a new currency to current cryptodata 
     * @param {String} newCurrency new currency to be added
     * @returns true if added else false
     */
    addCurrency(newCurrency) {
        if (this.allCurrencies.includes(newCurrency)) {
            this.vsCurrencies.add(newCurrency);
            this.refreshRates();
            return true;
        }
        else return false;
    }
}

const cryptodata = new CryptoData();
//get an immediate value
cryptodata.refreshRates()

//refresh rates continuously periodically
cryptodata.refreshRate = 3000

module.exports = cryptodata;
