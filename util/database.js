const mysql = require("mysql2");

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database: 'ecommerce_website',
    password: 'chawlA1234!'
});

module.exports = pool.promise();