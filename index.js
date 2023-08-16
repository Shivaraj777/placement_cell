// Description: Entry point of the application

const express = require('express'); // import the express module
const expressLayouts = require('express-ejs-layouts'); // import express-ejs-layouts module
const db = require('./config/mongoose'); // import themongoose module
const cookieParser = require('cookie-parser'); //import cookie parser module

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