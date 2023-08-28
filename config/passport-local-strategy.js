//Description: This file contains the code for the local strategy of passport

//import the passport module
const passport = require('passport');
//import the passport-local module and extract the LocalStrategy
const LocalStrategy = require('passport-local').Strategy;
//import the employee model
const Employee = require('../models/employee');

//authentication using passport
passport.use(new LocalStrategy({    //tell passport to use local startegy for authentication
        //defining the fields to be used for authentication
        usernameField: 'email',
        passReqToCallback: true //used to pass the request to the callback function, so that we can access the request in the callback function
    },
    function(req, email, password, done){   //done is a callback function which handles whether the authentication success and failure
        //find a employee and establish the identity
        Employee.findOne({email: email})
            .then(employee => {
                //if employee not found or password does not match
                if(!employee || employee.password != password){
                    console.log(`Invalid Username/Password`);
                    req.flash('error', 'Invalid Username/Password');
                    return done(null, false);  //null -> no error, false -> autentication failed
                }
                //if employee is found and password matches we return the user
                return done(null, employee);    //null -> no error, employee -> authentication success
            })
            .catch(err => {         //if there is an error in finding the employee
                console.log(`Error in finding employee --> Passport`);
                req.flash('error', err);
                return done(err);
            });
    }
));

//serializing the employee to decide which key is to be kept in the cookies
passport.serializeUser(function(employee, done){
    //setting the employee id as key in the cookies
    done(null, employee.id);
});

//deserializing the employee from the key in the cookies
passport.deserializeUser(function(id, done){
    //finding the employee using the id
    Employee.findById(id)
        .then(employee => {
            //if employee found
            if(employee){
                return done(null, employee);
            }
            //if employee not found
            return done(null, false);
        })
        .catch(err => {
            console.log(`Error in finding employee --> Passport`);
            return done(err);
        });
});

// middleware to check if employee is signed-in
passport.checkAuthentication = function(req, res, next){
    // if employee is signed-in proceed to next middleware/action
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/employee/sign-in'); //redirect to login page if employee is not signed-in
}

// middleware to send employee data to views
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // console.log(req);
        res.locals.employee = req.user;
    }

    next();
}

//exporting the passport module
module.exports = passport;