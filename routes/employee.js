const express = require('express'); // require express module
const employeeController = require('../controllers/employee_controller');

const router = express.Router();

// route requests
router.get('/signup', employeeController.signUp);
router.post('/create', employeeController.create); //route request to create action

// export the router
module.exports = router;


