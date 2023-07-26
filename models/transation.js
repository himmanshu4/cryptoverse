const { Schema, model } = require("mongoose");
const TransactionSchema = new Schema({
    coinID: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        min: [1, 'cant be less than 1'],
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
    transactionType: {
        type:String,
        enum: ["BUY", "SELL"],
        required: true,
    }
});
module.exports =  TransactionSchema 