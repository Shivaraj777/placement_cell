const express = require('express'); // require express module
const employeeController = require('../controllers/employee_controller');

const router = express.Router();

// route requests
router.get('/signup', employeeController.signUp);
router.get('/sign-in', employeeController.signIn); //route request to signIn action
router.post('/create', employeeController.create); //route request to create action

// export the router
module.exports = router;


