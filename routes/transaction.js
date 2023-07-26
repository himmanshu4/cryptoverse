const { Router } = require("express");
const cryptodata = require("../helper/coingecko");
const transactionRouter=Router();
transactionRouter.use((req,res,next)=>{
    if(!req.isAuthenticated()){
        res.redirect("/login");
        return;
    }
    next();
})
transactionRouter.get("/",(req,res)=>{
    res.send("oh hii");
});
transactionRouter.post("/",(req,res)=>{
    const type=req.body.type;
    const quantity=req.body.quantity;
    const coinID=req.body.coinID;
    if(/^(BUY|SELL)$/.test(null)&&/^\d*$/.test(quantity)&&cryptodata.coinsID.includes(coinID)){
        //valid transaction
        //TODO: Implement transaction
    }
});
module.exports=transactionRouter