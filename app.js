const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

//for express handlebar we need to require for pug we dont
const {engine} = require('express-handlebars');

const app = express();
const errorController = require("./controllers/error");
const {router:adminRoutes} = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const sequelize = require("./util/database");
const Product = require('./models/product');
const User = require('./models/user');

//handlebars
//for express handlebar we need to tell express it exists for pug we dont as it is kind of built in
app.engine("handlebars", engine({
    layoutsDir: 'views/layout', defaultLayout: 'main-layout', helpers: {
        eq: (a, b) => a === b
    },
}));
app.set('view engine', 'handlebars');
app.set('views', 'views');

//pug
//to set values globaally 
// app.set('view engine', 'pug');
// app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')))

app.get("/",(req,res)=>{
    res.send("Healthy server");
})

app.use('/admin', adminRoutes);
app.use('/shop',shopRoutes);


app.use(errorController.get404);



// we can define other one alse
Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});

User.hasMany(Product);

sequelize.sync({force: true}).then((_)=>{
    console.log(_);
    app.listen(3000,()=>{
        console.log("listening on port 3000");
    });
}).catch((_)=>{
    console.log("Error",_);
});

