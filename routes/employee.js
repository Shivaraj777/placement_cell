const express = require('express'); // require express module
const employeeController = require('../controllers/employee_controller'); 
const passport = require('passport');

const router = express.Router();

// route requests
router.get('/signup', employeeController.signUp);
router.get('/sign-in', employeeController.signIn); //route request to signIn action
router.post('/create', employeeController.create); //route request to create action
router.post('/create-session', passport.authenticate(
    'local', //use local strategy
    {failureRedirect: '/employee/sign-in'} 
), employeeController.createSession); //route request to createSession action
router.get('/destroy-session', employeeController.destroySession); //route request to destroy session action

// export the router
module.exports = router;


