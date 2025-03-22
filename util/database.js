const Sequelize = require("sequelize");

const sequelize = new Sequelize("ecommerce_website",'root','chawlA1234!',{
    dialect:'mysql',
    host: 'localhost'
});

module.exports = sequelize;