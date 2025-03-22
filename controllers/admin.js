const Product = require("../models/product");
const {defaultImagePath} = require("../util/constants");
const getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('admin/edit-product', { docTitle: 'Add to Products', path: '/admin/add-product', formsCss: true, productCss: true, activeAddProduct: true })
}

const addProduct = (req, res, next) => {
    const {title, imageUrl, price, description} = req.body;
    Product.create({
        title,
        imageUrl,
        price,
        description
    }).then((_)=>{
        console.log(_);
        res.redirect('/shop');
    }).catch(_=>{
        console.log(_.message);
    })
}

const getProducts = (req,res,next) => {
    // Product.fetchAll((data)=>{
        // res.render('admin/product-list', {
        //     prods: data,
        //     docTitle: 'Shop',
        //     priductCss: true,
        //     path:"admin/products"
        // })
    // });
    Product.findAll().then(_=>{
        res.render('admin/product-list', {
            prods: _.map(prod=>prod.get({plain:true})),
            docTitle: 'Shop',
            priductCss: true,
            path:"admin/products"
        })
    }).catch(_=>console.log(_.message));
}

const getEditProduct = (req, res, next) => {
    const {id} = req.params;
    Product.findByPk(id).then((product)=>{
        if(!product) {
            return res.send("No Product Found");
        }
        product = product.get({plain:true})
        product.price = product.price ? +product.price : 0;
        // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
        res.render('admin/edit-product', { docTitle: 'Edit Product', path: '/admin/edit-product', formsCss: true, productCss: true, activeAddProduct: true, isEdit: true , product})
    });

}
 
const postEditProduct = (req,res,next) => {
    const {id, title, imageUrl, price, description} = req.body;
    Product.findByPk(id).then((product)=>{
        if(!product) {
            return res.send("No Product Found");
        }
        product.title = title;
        product.imageUrl = imageUrl;
        product.price = price;
        product.description = description;
        return product.save();
    }).then(()=>{
        res.redirect('/admin/products');
    }).catch(e=>{
        console.log("Error",e.message);
    })
}

const deleteProduct = (req,res,next) => {
    const { id } = req.body;
    Product.findByPk(id).then(_=>_.destroy()).then(_=>{
        console.log("Product deleted");
        res.redirect('/admin/products');
    }).catch(_=>console.log("Error",_.message));
}

module.exports = {
    getAddProduct, addProduct, getProducts, getEditProduct, postEditProduct, deleteProduct
}