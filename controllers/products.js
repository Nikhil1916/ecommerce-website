const Product = require("../models/product");
const getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product', { docTitle: 'Add to Products', path: '/admin/add-product', formsCss: true, productCss: true, activeAddProduct: true })
}

const addProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/shop');
}

const getProducts = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    //rrs.render is add default by express and it will use the default template engone which we set in app.js
    // const products = adminData.products;
    Product.fetchAll((data)=>{
        res.render('shop', {
            prods: data,
            docTitle: 'Shop',
            activeShop: true,
            priductCss: true
        })
    });
}

module.exports = {
    getAddProduct,
    addProduct,
    getProducts
}
