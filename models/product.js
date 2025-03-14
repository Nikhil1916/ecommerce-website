const fs = require("fs");
const path = require("path");
const Cart = require("./cart");

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
const getProductsFromFile = (cb) => {
    // console.log(p, ">>>>>>>>");
    fs.readFile(p, (err, d) => {
        if (err) {
            cb([])
        } else {
            cb(JSON.parse(d));
        }
    });
}


module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile((products)=>{
            if(this.id) {
                const existingProductIndex = products.findIndex(_=>_.id == this.id);
                products[existingProductIndex] = this;
            } else {
                this.id = Math.random().toString();
                products.push(this);
            }
            fs.writeFile(p, JSON.stringify(products), (err)=>{});
        })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static getProduct(id, cb) {
        getProductsFromFile(products=>{
            const prod = products.find(_=>_.id == id);
            cb(prod);
        })
    }

    static delete(id) {
        getProductsFromFile(products=>{
            const prodIndex = products.findIndex(_=>_.id == id);
            const product = products?.[prodIndex];
            if(prodIndex>-1) products.splice(prodIndex, 1);
            console.log(products.length, prodIndex);
            Cart.deleteProduct(p,product.price);
            fs.writeFile(p, JSON.stringify(products), (err)=>{});
        })
    }
}