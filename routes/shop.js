const express = require('express');
const router = express.Router();
const shopController = require("../controllers/shop");



router.get('/', shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:id", shopController.getProduct);

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.addToCart);

// router.get("/checkout", shopController.getCheckout);

// router.get("/orders", shopController.getOrders);


router.post("/delete-item", shopController.deleteItemFromCart);


module.exports = router;
