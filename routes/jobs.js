const express = require('express'); //import express module
const jobsController = require('../controllers/jobs_controller'); //import the jobs_controller module
const passport = require('passport');

const router = express.Router();

router.get('/display-jobs', passport.checkAuthentication, jobsController.jobPage); //route request to jobPage action

// export the router
module.exports = router;
