const {Product} = require("../models/product");
const getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', { docTitle: 'Add to Products', path: '/admin/add-product', formsCss: true, productCss: true, activeAddProduct: true })
}

const addProduct = async(req, res, next) => {
    const {title, imageUrl, price, description} = req.body;
    const NewProduct = new Product({
      title,
      price,
      description,
      imageUrl,
    });
    console.log(NewProduct,"new prod");
    await NewProduct.save();
    res.redirect('/shop');
}

const getProducts = (req,res,next) => {
    Product.find().lean().then(_=>{
        res.render('admin/product-list', {
            prods: _,
            docTitle: 'Shop',
            priductCss: true,
            path:"admin/products"
        })
    }).catch(_=>console.log(_.message));
}

const getEditProduct = (req, res, next) => {
    const {id} = req.params;
     Product.findById(id).lean().then((product)=>{
        if(!product) {
            return res.send("No Product Found");
        }
        product.price = product.price ? +product.price : 0;
        res.render('admin/edit-product', { docTitle: 'Edit Product', path: '/admin/edit-product', formsCss: true, productCss: true, activeAddProduct: true, isEdit: true , product})
    });

}
 
const postEditProduct = async(req,res,next) => {
    const {id, title, imageUrl, price, description} = req.body;
    Product.findById(id).then(async(product)=>{
        if(!product) {
            return res.send("No Product Found");
        }
        product.title = title;
        product.price = price;
        product.description = description;
        product.imageUrl = imageUrl;
        await product.save();
        res.redirect('/admin/products');
    }).catch(e=>{
        console.log("Error",e.message);
    })
}

const deleteProduct = (req,res,next) => {
    const { id } = req.body;
    Product.findByIdAndDelete(id).then(_=>{
        console.log("Product deleted");
        res.redirect('/admin/products');
    }).catch(_=>console.log("Error",_.message));
}

module.exports = {
    addProduct,getAddProduct, getProducts, getEditProduct, postEditProduct, deleteProduct
}