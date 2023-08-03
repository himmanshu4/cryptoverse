// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URL;
function connect(){
mongoose.connect(mongoDB,{
    minPoolSize:1,heartbeatFrequencyMS:3000
}).catch(error=>connect());
}
connect();
mongoose.connection.on('error',onError);
mongoose.connection.on('connected',onConnect);
mongoose.connection.on('disconnected',onDisconnect);

/**
 * Middleware to send error when db problems
 * @param {String} errorMessage error message to send to user
 * @returns 
 */
function dbCheck(errorMessage="DB error"){
    return (req,res,next)=>{
        if(mongoose.connection.readyState!=1){
            res.send(errorMessage)
        }
        else{
            next()
        }
    }
}
module.exports = dbCheck

function onError(error) {
    console.error("DB error");
}
function onDisconnect(){
    console.log("DB disconnected");
}
function onConnect(){
    console.log("DB connected");
}
