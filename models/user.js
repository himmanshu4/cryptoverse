const { Schema, model } = require("mongoose");
const TransactionSchema = require("./transation");

const UserSchema = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        balance: {
            type: Number,
            min: [0, 'Low balance'],
            default: 10000
        },
        deposit: {
            type: Number,
            min: [0, 'Low deposits'],
            default: 10000
        },
        transcations: [TransactionSchema]
    }
);
const User = model('User', UserSchema)
module.exports = User;