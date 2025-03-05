const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const {addProduct, getAddProduct, getProducts} = require("../controllers/admin");

const router = express.Router();
// /admin/add-product => GET
router.get('/add-product',getAddProduct);

// /admin/add-product => POST
router.post('/add-product', addProduct);

router.get("/products", getProducts);

module.exports = {router};
