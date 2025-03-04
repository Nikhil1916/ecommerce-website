const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

//for express handlebar we need to require for pug we dont
const {engine} = require('express-handlebars');


const app = express();


//handlebars
//for express handlebar we need to tell express it exists for pug we dont as it is kind of built in
app.engine("handlebars",engine({  layoutsDir:'views/layout', defaultLayout: 'main-layout' }));
app.set('view engine', 'handlebars');
app.set('views', 'views');

//pug
//to set values globaally 
// app.set('view engine', 'pug');
// app.set('views', 'views');

const {router:adminRoutes} = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')))

app.use('/admin', adminRoutes);
app.use('/shop',shopRoutes);

// app.use("/",(req,res)=>{
//     res.send("Healthy server");
// })

app.use((req, res, next) => {
    console.log("Hi");
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', {pageHeading:"Page Not Found",docTitle:"404"});
});

app.listen(3000,()=>{
    console.log("listening on port 3000");
});
