const express = require('express'); //import express module
const interviewController = require('../controllers/interviews_controller') //import interviews_controller module
const passport = require('passport'); //import passport module

const router = express.Router();

router.get('/display-interviews', passport.checkAuthentication, interviewController.displayInterviews); //route the request to displayInterviews action
router.post('/create-interview', passport.checkAuthentication, interviewController.createInterview); //route the request to createInterview action
router.put('/assign-interview', passport.checkAuthentication, interviewController.assignInterview); //route the request to assignInterview action
router.patch('/update-interview-status', passport.checkAuthentication, interviewController.updateInterviewStatus); //router request to updateInterviewStatus action

// export the router
module.exports = router;