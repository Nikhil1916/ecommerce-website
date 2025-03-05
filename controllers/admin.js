const Product = require("../models/product");
const getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('admin/add-product', { docTitle: 'Add to Products', path: '/admin/add-product', formsCss: true, productCss: true, activeAddProduct: true })
}

const addProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/shop');
}

const getProducts = (req,res,next) => {
    Product.fetchAll((data)=>{
        res.render('admin/product-list', {
            prods: data,
            docTitle: 'Shop',
            priductCss: true,
            path:"admin/products"
        })
    });
}

module.exports = {
    getAddProduct, addProduct, getProducts
}