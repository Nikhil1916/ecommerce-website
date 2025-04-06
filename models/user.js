const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart:{
    type: Object
  }
});

const User = mongoose.model("User", userSchema);
module.exports = {User};


// const { ObjectId } = require("mongodb");
// const { getDb } = require("../util/database");

// class User {
//   constructor(username, email, cart, _id) {
//     this.username = username;
//     this.email = email;
//     this.cart = cart;
//     this._id = _id;
//   }

//   save() {
//     const _db = getDb();
//     if (this._id) {
//     } else {
//       return _db
//         .collection("users")
//         .insertOne(this)
//         .then((_) => {
//           console.log(_);
//         })
//         .catch((_) => {
//           console.log(_.message);
//         });
//     }
//   }

//   addToCart(product) {
//     if(!this.cart || !this.cart.items) {
//       this.cart = {
//         items:[]
//       }
//     }
//     const cartProductIndex = this.cart?.items?.findIndex((cp) => {
//       return cp.productId.toString() == product._id.toString();
//     });
//     let quantity = 1;
//     const cart = [...this.cart.items];
//     if(cartProductIndex>=0) {
//       quantity = this.cart.items[cartProductIndex].quantity + 1;
//       cart[cartProductIndex].quantity = quantity;
//     } else {
//       cart.push({
//         productId: new ObjectId(product._id),
//         quantity,
//       });
//     }
//     const updatedCart = {
//       items: cart
//     }
//     const db = getDb();
//     db.collection("users").updateOne(
//         {
//             _id:new ObjectId(this._id)
//         },
//         {
//             $set:{
//                 cart: updatedCart
//             }
//         }
//     )

//   }

//   static findById(id) {
//     const _db = getDb();
//     return _db
//       .collection("users")
//       .findOne({ _id: new ObjectId(id) })
//       .then((_) => {
//         return _;
//       })
//       .catch((_) => {
//         console.log(_.message);
//       });
//   }

//   getCart() {
//     const _db = getDb();
//     return _db.collection("products").find({
//       _id:{
//         $in: [...this.cart.items.map(_=>_?.productId)]
//       }
//     }).toArray().then(products=>{
//       return products.map(p=>{
//         return {...p, quantity: this.cart.items.find(_=>_.productId.toString() == p._id.toString())?.quantity}
//       })
//     });
//   }


//   deleteItemFromCart(prodId) {
//     const items = this.cart.items.filter(_=>_?.productId.toString()!=prodId.toString());
//     const _db = getDb();
//     return _db.collection("users").updateOne(
//         {
//             _id:new ObjectId(this._id)
//         },
//         {
//             $set:{
//                 cart: {
//                   items
//                 }
//             }
//         }
//     )

//   }

//   addOrder() {
//     const _db = getDb();
//     return this.getCart().then(products=>{
//       const order = {
//         items: products,
//         user: {
//           _id: new ObjectId(this._id),
//           name: this.username,
//           email: this.email
//         }
//       }
//       return _db.collection("orders").insertOne(order).then(_=>{
//         this.cart = {
//           items:[]
//         }
//         return _db.collection("users").updateOne(
//           {
//               _id:new ObjectId(this._id)
//           },
//           {
//               $set:{
//                   cart: {
//                     items: []
//                   }
//               }
//           }
//       )
//       });
//     })
//   }

//   getOrders() {
//     const _db = getDb();
//     return _db.collection("orders").find({
//       "user._id":this._id
//     }).toArray();
//   }
// }

// module.exports = User;