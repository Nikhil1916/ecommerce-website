const fs = require("fs");
const path = require("path");
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

module.exports = class Cart {
    static addProduct(id , productPrice) {
        try {
            console.log(id, productPrice, p);
            //fetch the previous cart
    
            fs.readFile(p,(err, fileContent)=>{
                let cart = {
                    products:[],
                    totalPrice: 0
                }
                if(!err) {
                    cart = JSON.parse(fileContent);
                } else if (err.code !== 'ENOENT') {
                    console.error("Error reading file:", err);
                    return; // Stop execution if another error occurs
                }
                //anlyze the cart=>if product exits
                const existingProduct = cart.products.find((_)=>_.id == id);
                let updatedProduct = {};
                //add new product or increase quantity
                if(existingProduct) {
                    existingProduct.quantity = existingProduct.quantity + 1;
                } else {
                    updatedProduct = {
                        id,
                        quantity: 1,
                        productPrice 
                    }
                    cart.products.push(updatedProduct)
                }
                cart.totalPrice = (+cart.totalPrice) + (+productPrice);
                fs.writeFile(p, JSON.stringify(cart), (err)=>{
                    console.log(err);
                })
    
            })
        } catch(e) {
            console.log(e);
        }

    }

    static deleteProduct(id, productPrice) {
        try {    
            fs.readFile(p,(err, fileContent)=>{
                let cart = {
                    products:[],
                    totalPrice: 0
                }
                if(err) {
                    return;
                } else {
                    cart = JSON.parse(fileContent);
                }
                const existingProduct = cart.products.find((_)=>_.id == id);
                if (existingProduct) {
                  cart.products = cart.products.filter((_)=>_.id != id);
                  cart.totalPrice = +cart.totalPrice - ((+productPrice) * existingProduct.quantity);
                  fs.writeFile(p, JSON.stringify(cart), (err) => {
                    console.log(err);
                  });
                }
    
            })
        } catch(e) {
            console.log(e);
        }
    }

}