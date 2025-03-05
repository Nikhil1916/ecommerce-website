const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const {addProduct, getAddProduct} = require("../controllers/products");

const router = express.Router();
// /admin/add-product => GET
router.get('/add-product',getAddProduct);

// /admin/add-product => POST
router.post('/add-product', addProduct);

module.exports = {router};
