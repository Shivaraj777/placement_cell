// Descriptions: This file contains the actions related to employees
const Employee = require('../models/employee');

// action to render signup page
module.exports.signUp = function(req, res){
    return res.render('employee_signup', {
        title: 'Employee SignUp page'
    });
}

// action to signup a employee
module.exports.create = async function(req, res){
    // do not signup employee if password does not match
    if(req.body.password !== req.body.confirm_password){
        return res.redirect('back');
    }

    try{
        // check if the employee account already exists
        let employee = await Employee.findOne({email: req.body.email});

        // if employee account does not exist, create employee
        if(!employee){
            await Employee.create(req.body);
            return res.redirect('/');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log(`Error: ${err}`);
        return res.redirect('back');
    }
}