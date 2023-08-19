// Description: Entry point of routes folder which routes the requests

// import express module
const express = require('express');
const router = express.Router();

// import home controller
const homeController = require('../controllers/home_controller');

console.log('Router loaded'); //just a check

// route the requests
router.get('/', homeController.home);
router.use('/employee', require('./employee')); //route request to employee router
router.use('/students', require('./students')); //route request to students router

// export the router
module.exports = router;