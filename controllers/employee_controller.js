// Descriptions: This file contains the actions related to employees
const Employee = require('../models/employee');

// action to render signup page
module.exports.signUp = function(req, res){
    // if user is logged in redirect to home page
    if(req.isAuthenticated()){
        return res.redirect('/');
    }

    return res.render('employee_signup', {
        title: 'Employee SignUp page'
    });
}

// action to render login page
module.exports.signIn = function(req, res){
    // if user is logged in redirect to home page
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    
    return res.render('employee_login', {
        title: 'Employee Login page'
    });
}

// action to signup a employee
module.exports.create = async function(req, res){
    // do not signup employee if password does not match
    if(req.body.password !== req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    try{
        // check if the employee account already exists
        let employee = await Employee.findOne({email: req.body.email});

        // if employee account does not exist, create employee
        if(!employee){
            await Employee.create(req.body);
            req.flash('success', 'Employee registration successful, Please login to continue');
            return res.redirect('/employee/sign-in');
        }else{
            req.flash('error', 'Employee already registered');
            return res.redirect('back');
        }
    }catch(err){
        console.log(`Error: ${err}`);
        req.flash('error', err);
        return res.redirect('back');
    }
}

// action to create session
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}

// action to destroy session
module.exports.destroySession = function(req, res){
    // built-in passport method to destroy the session
    req.logout((err) => {
        if(err){
            return next(err);
        }

        req.flash('success', 'Logged out successfully');
        return res.redirect('/');
    });
}