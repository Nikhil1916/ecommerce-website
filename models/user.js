const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref:"Product"
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

userSchema.methods = {
  addToCart: async function(product) {
    // console.log(product, this);
    if (!this.cart || !this.cart.items) {
      this.cart = {
        items: [],
      };
    }
    const cartProductIndex = this.cart?.items?.findIndex((cp) => {
      return cp.productId.toString() == product._id.toString();
    });
    let quantity = 1;
    const cart = [...this.cart.items];
    if (cartProductIndex >= 0) {
      quantity = this.cart.items[cartProductIndex].quantity + 1;
      cart[cartProductIndex].quantity = quantity;
    } else {
      cart.push({
        productId: product._id,
        quantity,
      });
    }
    const updatedCart = {
      items: cart,
    };
    this.cart = updatedCart;
    return await this.save();
  },

  removeFromCart(prodId) {
    const items = this.cart.items.filter(_=>_?.productId.toString()!=prodId.toString());
    this.cart.items = items;
    return this.save();
  },
  clearCart() {
    this.cart.items = [];
    this.save(); 
  }
}

const User = mongoose.model("User", userSchema);
module.exports = { User };