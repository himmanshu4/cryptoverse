const { Schema, model } = require("mongoose");
const { TransactionSchema } = require("./transation");

const UserSchema = new Schema(
    {
        username: { type: String, required: true,unique:[true,"other user exists"] },
        password: { type: String, required: true },
        email: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
                },
                message: props => `${props.value} is not a valid email`
            }
        },
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
        transcations: [{
            type: Schema.Types.ObjectId,
            ref: 'Transaction',
        }]
    }
);
const User = model('User', UserSchema)
module.exports = User;