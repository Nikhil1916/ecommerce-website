const { Order } = require("../models/order");
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
    req.user.populate("cart.items.productId").then((_)=>{
        const products = _.cart.items.map(item => {
            const product = item.productId.toObject(); // Convert populated product to plain object
            return {
              ...product,
              quantity: item.quantity
            };
          });
        
        res.render("shop/cart", {
            path: "/shop/cart",
            pageTitle: "Your Cart",
            products,
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
    Order.find({
        "user.user_id": req.user._id
    }).then(_=>{
        return res.json({
            _
        })
    });
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
   req.user.populate("cart.items.productId").then((_) => {
    const products = _.cart.items.map((item) => {
      const product = item.productId.toObject(); // Convert populated product to plain object
      return {
        product,
        quantity: item.quantity,
      };
    });

    const order = new Order({
        user:{
            name:req.user.username,
            user_id: req.user._id
        },
        products
      });

      order.save().then(_=>{
        req.user.clearCart();
        res.redirect("/orders");
      })
  });
}

const deleteItemFromCart = (req,res,next) => {
    const {id} = req.body;
    req.user.removeFromCart(id).then(_=>{
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
  postOrder,
};
