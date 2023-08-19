// Description: This file contains all the action related to students

const Student = require('../models/student');

// render students page
module.exports.displayStudents = function(req, res){
    res.render('students', {
        title: 'Student Details page'
    });
}

// action to create a student
module.exports.createStudent = async function(req, res){
    // don't create student if name and email is empty
    if(req.body.name === '' || req.body.email === ''){
        return res.redirect('back');;
    }

    try{
        // check if the student already exists
        let student = await Student.findOne({email: req.body.email});

        // if student does not exist, create student
        if(!student){
            await Student.create(req.body);
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log(`Error: ${err}`);
        return res.redirect('back');
    }
}