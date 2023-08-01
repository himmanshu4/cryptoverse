// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URL;
function connect(){
mongoose.connect(mongoDB);
}
connect();
mongoose.connection.on('error',onError);
mongoose.connection.on('connected',onConnect);
mongoose.connection.on('disconnected',onDisconnect);


module.exports = mongoose.connection;

function onError(error) {
    console.error("subsequent DB error");
}
function onDisconnect(){
    console.log("DB disconnected");
}
function onConnect(){
    console.log("DB connected");
}
