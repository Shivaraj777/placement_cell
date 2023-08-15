const mongoose = require('mongoose'); // require mongoose model

// create the schema for employee collection
const employeeSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// create the employee model/collection
const Employee = mongoose.model('Employee', employeeSchema);

// export the model
module.exports = Employee;