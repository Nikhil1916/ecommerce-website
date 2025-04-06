const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const {engine} = require('express-handlebars');
const {User} = require("./models/user");

const app = express();
const errorController = require("./controllers/error");
const {router:adminRoutes} = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const {connectToDb} = require('./util/database');

//handlebars
//for express handlebar we need to tell express it exists for pug we dont as it is kind of built in
app.engine("handlebars", engine({
    layoutsDir: 'views/layout', defaultLayout: 'main-layout', helpers: {
        eq: (a, b) => a === b
    },
}));
app.set('view engine', 'handlebars');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')))

app.get("/",(req,res)=>{
    res.send("Healthy server");
});

app.use((req,res,next)=>{
    User.findById("67ec11ffd5af4cb28d11ee9b").then(_=>{
        req.user = _
        console.log(req.user);
        next();
    }).catch(_=>{
        console.log("Error in app.js user middleware", _.message);
        next();
    })
    // next();
})

app.use('/admin', adminRoutes);
app.use('/shop',shopRoutes);

app.use(errorController.get404);

connectToDb(()=>{
    app.listen(3000,()=>{
        console.log("listening on port 3000");
    });
})

