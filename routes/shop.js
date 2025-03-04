const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const adminData = require("./admin");

router.get('/', (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  //rrs.render is add default by express and it will use the default template engone which we set in app.js
  const products = adminData.products;
  res.render('shop', {
    prods: products,
    docTitle: 'Shop',
    activeShop: true,
    priductCss: true
  })
});

module.exports = router;
