const fs = require("fs");
const Cart = require("./cart");
const db = require("../util/database");

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
        return db.execute("INSERT INTO `products` (`title`, `price`, `created_at`, imageURL, description) VALUES (?,?,?,?,?)",
            [this.title, this.price, new Date().toISOString().slice(0, 19).replace('T', ' '), this.imageUrl, this.description]
        );
    }

    static fetchAll(cb) {
        return db.execute("SELECT * FROM products");
    }

    static getProduct(id, cb) {
        return db.execute("SELECT * FROM products WHERE products.id=?",[id]);
    }

    static delete(id) {
        getProductsFromFile(products=>{
            const prodIndex = products.findIndex(_=>_.id == id);
            const product = products?.[prodIndex];
            if(prodIndex>-1) products.splice(prodIndex, 1);
            console.log(products.length, prodIndex , product);
            Cart.deleteProduct(product.id,product.price);
            fs.writeFile(p, JSON.stringify(products), (err)=>{});
        })
    }
}