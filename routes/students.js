const express = require('express'); //import express module
const studentsController = require('../controllers/students_controller'); //import students_controller

const router = express.Router();

router.get('/display-students', studentsController.displayStudents); //route request to displayStudents action

// export router
module.exports = router;