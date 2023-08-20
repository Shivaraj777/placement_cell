const express = require('express'); //import express module
const interviewController = require('../controllers/interviews_controller') //import interviews_controller module
const passport = require('passport'); //import passport module

const router = express.Router();

router.get('/display-interviews', passport.checkAuthentication, interviewController.displayInterviews); //route the request to displayInterviews action

// export the router
module.exports = router;