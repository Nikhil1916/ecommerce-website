const Cart = require("../models/cart");
const Product = require("../models/product");

const getProducts = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    //rrs.render is add default by express and it will use the default template engone which we set in app.js
    // const products = adminData.products;
    Product.fetchAll((data)=>{
        res.render('shop/product-list', {
            prods: data,
            docTitle: 'Shop',
            activeShop: true,
            priductCss: true,
            path:"/shop/products"
        })
    });
}


const getProduct = (req,res,next) => {
    const prodId = req.params?.id;
    Product.getProduct(prodId,(product)=>{
        res.render("shop/product-detail",{
            product,
            docTitle: product?.title,
            path:'/shop/products'
        });
    });
}


const getCart = (req,res,next) => {
    Cart.fetchCart((cart)=>{
        Product.fetchAll((products)=>{
            const cartProducts = [];
            for(let product of products) {
                const cartProduct = cart.products.find(_=>_.id == product.id);
                if(cartProduct) {
                    cartProducts.push({
                        productData: product, 
                        quantity: cartProduct.quantity
                    });
                }
            }
            console.log(cartProducts.length,">>>>>>>>>>>>>>>>>>>>>.cart products");
            res.render("shop/cart",
                {
                    path:"/shop/cart",
                    pageTitle:"Your Cart",
                    products: cartProducts
                });

        })
    })

}

const getIndex = (req,res,next) => {
    Product.fetchAll((data)=>{
        res.render('shop/index', {
            prods: data,
            docTitle: 'Shop',
            activeShop: true,
            priductCss: true,
            path:"/shop"
        })
    });
}

const getCheckout = (req,res,next) => {
    res.render('shop/checkout',{
        path:'/shop/checkout',
        pageTitle:"Checkout"
    })
}

const getOrders = (req,res,next) => {

    res.render('shop/orders',{
        path:'/shop/orders',
        pageTitle:"Your Orders"
    })
}


const addToCart = (req,res,next) => {
    const {productId} = req.body;
    console.log(productId);
    Product.getProduct(productId,(product)=>{
        Cart.addProduct(productId, product.price);
    });
    res.redirect("/shop/cart");
}

const deleteItemFromCart = (req,res,next) => {
    const {id} = req.body;
    Product.getProduct(id,(product)=>{
        Cart.deleteProduct(id, product.price);
        res.redirect("/shop/cart")
    })
}

module.exports = {
    getProducts,
    getIndex,
    getCheckout,
    getCart,
    getOrders,
    getProduct,
    addToCart,
    deleteItemFromCart
}
