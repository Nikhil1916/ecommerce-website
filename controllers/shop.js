const {Product} = require("../models/product");

const getProducts = (req, res, next) => {
    Product.find().lean().then(_=>{
        res.render('shop/product-list', {
                    prods: _,
                    docTitle: 'Shop',
                    activeShop: true,
                    priductCss: true,
                    path:"/shop/products"
                })
    }).catch(_=>console.log(_.message));
}


const getProduct = (req,res,next) => {
    const prodId = req.params?.id;
    Product.findById(prodId).lean().then(product=>{
        console.log(product);
        res.render("shop/product-detail", {
          product: product,
          docTitle: product?.title,
          path: "/shop/products",
        });
    })
}


const getCart = (req,res,next) => {
    req.user.getCart().then((_)=>{
        res.render("shop/cart", {
            path: "/shop/cart",
            pageTitle: "Your Cart",
            products: _,
          });
    })
    .catch(err=>{
        console.log(err);
    })

}

const getIndex = (req,res,next) => {
    Product.find({}).lean()
      .then((_) => {
        console.log(_);
        res.render("admin/product-list", {
          prods: _,
          docTitle: "Shop",
          activeShop: true,
          priductCss: true,
          path: "/shop",
        });
      })
      .catch((_) => console.log(_.message));
}

const getCheckout = (req,res,next) => {
    res.render('shop/checkout',{
        path:'/shop/checkout',
        pageTitle:"Checkout"
    })
}

const getOrders = (req,res,next) => {
    req.user.getOrders().then(_=>{
        return res.json({
            _
        });
    })
}


const addToCart = (req,res,next) => {
    const {productId} = req.body;
    Product.findById(productId).then(product=>{
        return req.user.addToCart(product);
    }).then(_=>{
        res.redirect("/shop/cart");
        console.log(_, "user modified");
    }).catch(_=>{
        console.log(_.message," add to cart error");
    });
}

const postOrder = (req,res,next) => {
    req.user.addOrder().then(_=>{
        res.redirect("/orders");
    })
}

const deleteItemFromCart = (req,res,next) => {
    const {id} = req.body;
    req.user.deleteItemFromCart(id).then(_=>{
        res.redirect("/shop/cart")
    })
}

module.exports = {
    getProducts,
    getIndex,
    //getCheckout,
    getCart,
     getOrders,
     getProduct,
     addToCart,
    deleteItemFromCart,
    postOrder
}
