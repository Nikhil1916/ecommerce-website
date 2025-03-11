const Product = require("../models/product");
const getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('admin/edit-product', { docTitle: 'Add to Products', path: '/admin/add-product', formsCss: true, productCss: true, activeAddProduct: true })
}

const addProduct = (req, res, next) => {
    const {title, imageUrl, price, description} = req.body;
    const product = new Product(title, imageUrl, description, price);
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

const getEditProduct = (req, res, next) => {
    const {id} = req.params;
    Product.getProduct(id,(product)=>{
        if(!product) {
            return res.send("No Product Found");
        }
        // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
        res.render('admin/edit-product', { docTitle: 'Edit Product', path: '/admin/edit-product', formsCss: true, productCss: true, activeAddProduct: true, isEdit: true , product})
    });

}

module.exports = {
    getAddProduct, addProduct, getProducts, getEditProduct
}