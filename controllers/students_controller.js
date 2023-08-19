// Description: This file contains all the action related to students

// render students page
module.exports.displayStudents = function(req, res){
    res.render('students', {
        title: 'Student Details page'
    });
}