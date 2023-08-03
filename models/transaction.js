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
    limitRate: {
        default: 0,
        type: Number,
        required: true
    },
    executed: { type: Boolean, required: true }
});
const Transaction = model('Transaction', TransactionSchema);
module.exports = { TransactionSchema, Transaction }