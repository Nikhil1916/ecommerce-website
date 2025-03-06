const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
const getProductsFromFile = (cb) => {
    console.log(p, ">>>>>>>>");
    fs.readFile(p, (err, d) => {
        if (err) {
            cb([])
        } else {
            cb(JSON.parse(d));
        }
    });
}


module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        this.id = Math.random().toString();
        getProductsFromFile((products)=>{
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err)=>{});
        })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static getProduct(id, cb) {
        console.log(cb);
        getProductsFromFile(products=>{
            const prod = products.find(_=>_.id == id);
            cb(prod);
        })
    }
}