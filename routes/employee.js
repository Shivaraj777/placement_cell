const express = require('express'); // require express module
const employeeController = require('../controllers/employee_controller');

const router = express.Router();

// route request to signup action of employee controller
router.get('/signup', employeeController.signUp);

// export the router
module.exports = router;


