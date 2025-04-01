const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");

class User {
  constructor(username, email, cart, _id) {
    this.username = username;
    this.email = email;
    this.cart = cart;
    this._id = _id;
  }

  save() {
    const _db = getDb();
    if (this._id) {
    } else {
      return _db
        .collection("users")
        .insertOne(this)
        .then((_) => {
          console.log(_);
        })
        .catch((_) => {
          console.log(_.message);
        });
    }
  }

  addToCart(product) {
    // const cartProduct = this.cart.items.findIndex((cp) => {
    //   return cp._id == product._id;
    // });
    const updatedCart = {
        items:[
            {
                productId: new ObjectId(product._id),
                quantity: 1
            }
        ]
    }
    const db = getDb();
    db.collection("users").updateOne(
        {
            _id:new ObjectId(this._id)
        },
        {
            $set:{
                cart: updatedCart
            }
        }
    )

  }

  static findById(id) {
    const _db = getDb();
    return _db
      .collection("users")
      .findOne({ _id: new ObjectId(id) })
      .then((_) => {
        return _;
      })
      .catch((_) => {
        console.log(_.message);
      });
  }
}

module.exports = User;