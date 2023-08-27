const express = require('express'); //import express module
const studentsController = require('../controllers/students_controller'); //import students_controller
const passport = require('passport'); //import passport module

const router = express.Router();

router.get('/display-students', passport.checkAuthentication, studentsController.displayStudents); //route request to displayStudents action
router.post('/create-student', studentsController.createStudent); //router request to createStudent action
router.get('/download-data', studentsController.downloadStudentData); //route request to downloadStudentData action

// export router
module.exports = router;