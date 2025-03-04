const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();
const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  res.render('add-product',{docTitle:'Add to Products', path:'/admin/add-product', formsCss:true,productCss:true,activeAddProduct:true})
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  products.push({title:req.body.title});
  res.redirect('/shop');
});

module.exports = {router, products};
