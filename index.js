// import the express module
const express = require('express');
const app =  express();

// define the port
const port = 8000;

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