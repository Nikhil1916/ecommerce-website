const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description:{
    type: String,
  },
  imageUrl:{
    type: String
  }
});

const Product = mongoose.model("Product", productSchema);
module.exports = {Product};




// const { getDb } = require("../util/database");

// const { ObjectId } = require('mongodb');

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id;
//     this.user_id = userId;
//   }

//   save() {
//     const _db = getDb();
//     // console.log(this, "this");
//     if(this._id) {
//       const { _id, ...updateData } = this
//       return _db.collection("products").updateOne({_id:new ObjectId(this._id)},{
//         $set: updateData
//       }).then(_=>{
//         console.log(_);
//       }).catch(_=>{
//         console.log("error",_.message)
//       });
//     } else {
//       return _db.collection("products").insertOne(this).then(_=>{
//         console.log(_);
//       }).catch(_=>{
//         console.log("error",_.message)
//       });
//     }
//   }

//   static fetchAll() {
//     const _db = getDb();
//     return _db.collection("products").find({}).toArray();
//   }

//   static findById(_id) {
//     console.log(_id);
//     const _db = getDb();
//     return _db.collection("products").find({
//       _id:new ObjectId(_id)
//     }).next()
//   }

//   static deleteById(_id) {
//     const _db = getDb();
//     return _db.collection("products").findOneAndDelete({
//       _id:new ObjectId(_id)
//     });
//   }
// }


// module.exports = Product;



