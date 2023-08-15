// Descriptions: This file contains the actions related to employees

// action to render signup page
module.exports.signUp = function(req, res){
    return res.render('employee_signup', {
        title: 'Employee SignUp page'
    });
}