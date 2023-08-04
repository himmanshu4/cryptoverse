const { Schema, model } = require("mongoose");
const TransactionSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    coinID: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        min: [1, 'quantity can\'t be less than 1'],
        required: true,
    },
    rate: {
        type: Number,
    },
    limitRate: {
        default: 0,
        type: Number,
        required: true
    },
    executed: { type: Boolean,default:true, required: true },
    buyOrSell:{type:String , enum:["buy","sell"]}
});
const Transaction = model('Transaction', TransactionSchema);
module.exports = { TransactionSchema, Transaction }
