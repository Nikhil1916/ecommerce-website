const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: [
        {
            product:{
                type:Object
            },
            quantity: Number
        }
    ],
    user: {
        name: {
            type:String,
        },
        user_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref:"User"
        }
    }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = {Order};