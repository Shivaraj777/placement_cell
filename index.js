// Description: Entry point of the application

const express = require('express'); // import the express module
const expressLayouts = require('express-ejs-layouts'); // import express-ejs-layouts module
const db = require('./config/mongoose'); // import themongoose module
const cookieParser = require('cookie-parser'); //import cookie parser module
const passport = require('passport'); //import passport module
const passportLocal = require('./config/passport-local-strategy'); //import passport local strategy module from configs
const session = require('express-session');  //import expression-session module
const MongoStore = require('connect-mongo'); //import connect-mongo module to store session info in DB

const app =  express(); // create the express app
const port = 8000; // define the port

// set the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// extracts styles and scripts from sub-pages to the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// middleware to parse form data
app.use(express.urlencoded({extended:true}));

// middleware to read and write into cookies
app.use(cookieParser());

// middleware to access static files in assets folder
app.use(express.static('./assets'));

// use express layouts
app.use(expressLayouts);

// use expression session middleware to maintain the session cookies
app.use(session({
    name: 'placement_cell', //name of the session cookie
    secret: 'somesecretcode', //secret key used to encrypt the session-cookie
    saveUninitialized: false, //if user is not logged in, do not save session-cookie
    resave: false, //if the session-cookie is not modified do not save it
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongoUrl: 'mongodb://127.0.0.1/placement_cell',  //connecting to the database
            autoRemove: 'disabled'  //do not remove the session from the database even if it expires
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

// use passport middlewares
app.use(passport.initialize()); //initialize the session
app.use(passport.session()); //maintain the session

// set employee in the views
app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes')); //routes the request to index.js file of routes folder


// listen on the server
app.listen(port, function(err){
    if(err){
        console.log(`Error in runing the server: ${err}`);
        return;
    }

    console.log(`Server is running on port: ${port}`);
});