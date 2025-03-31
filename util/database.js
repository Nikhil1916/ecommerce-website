const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const connectToDb = (callback) => {
    MongoClient.connect("mongodb+srv://nikhilchawla9013:1icVCiLKJGHdvfSw@cluster0.of1mhqj.mongodb.net/ecommerce-app").then((_)=>{
        console.log("connected");
        callback();
        _db = _.db();
    }).catch((e)=>{
        console.log("not connected",e?.message);
        throw e;
    })
}

const getDb = () => {
    if(_db) return _db;
    throw Error("No Db Found");
}

module.exports = {
    connectToDb,
    getDb
};