const { Router } = require("express");
const cryptodata = require("../helper/coingecko");
const { Transaction } = require("../models/transaction");
const transactionRouter = Router();

transactionRouter.use((req, res, next) => {
    if (!req.isAuthenticated()) {
        res.redirect("/login");
        return;
    }
    next();
})
transactionRouter.get("/", (req, res) => {
    res.render("transaction");
});
transactionRouter.post("/submit", async (req, res, next) => {

    try {
        const transaction = await createTransaction(req.body, req.user);
        const rate = await saveTransactionRate(transaction);

        await updateUser(req.user, transaction);
        await req.user.populate('transactions');
        res.render("profile", { user: req.user });
    } catch (error) {
        if (error.message) res.send(error.message)
        else
            next(error)
    }

});

async function createTransaction(data, user) {
    const transaction = new Transaction();
    transaction.user = user._id;
    transaction.coinID = data.coinID;
    transaction.quantity = parseInt(data.quantity);
    transaction.buyOrSell = data.buyOrSell;
    transaction.limitRate = data.limitRate ?? 0;

    return transaction;
}

async function saveTransactionRate(transaction) {
    if (!cryptodata.coinsID.has(transaction.coinID)) {
        throw { message: "coin does not exist" };
    }
    const rate = Number(cryptodata.rates[transaction.coinID]?.usd || 0);
    transaction.rate = rate;
    await transaction.save();
}

async function updateUser(user, transaction) {
    let coinBal = user.coinBalance.get(transaction.coinID) ?? 0;
    let change = Number(transaction.rate * transaction.quantity);
    if (transaction.buyOrSell == "sell") {
        change *= -1;
        coinBal -= transaction.quantity;
    } else {
        coinBal += transaction.quantity;
    }
    user.coinBalance.set(transaction.coinID, coinBal);
    user.balance -= change;
    user.transactions.push(transaction);

    await user.save();
}
module.exports = transactionRouter