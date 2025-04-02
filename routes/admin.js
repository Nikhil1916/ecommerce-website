const express = require('express');
const router = express.Router();
const {addProduct, getAddProduct, getProducts, getEditProduct, postEditProduct,deleteProduct} = require("../controllers/admin");


router.get('/add-product',getAddProduct);
router.post('/add-product', addProduct);
router.get('/edit-product/:id', getEditProduct);
router.post('/edit-product/:id', postEditProduct);
router.get("/products", getProducts);
router.post("/delete-product",deleteProduct);

module.exports = {router};
