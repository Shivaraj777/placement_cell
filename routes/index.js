// Description: Entry point of routes folder which routes the requests

// import express module
const express = require('express');
const router = express.Router();

// import home controller
const homeController = require('../controllers/home_controller');

console.log('Router loaded'); //just a check

// route the request
router.get('/', homeController.home);

module.exports = router;