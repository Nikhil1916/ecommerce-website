const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const adminData = require("./admin");
const productController = require("../controllers/products");

router.get('/', productController.getProducts);

module.exports = router;
