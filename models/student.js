const mongoose = require('mongoose'); //import mongoose module

// create the schema for student
const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    batch: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Placed' , 'Not placed'],
        default: 'Not placed'
    },
    DSA_FinalScore :{
        type:Number,
        default:0
    },
    WebD_FinalScore :{
        type : Number,
        default:0
    },
    React_FinalScore :{
        type : Number,
        default:0
    }
}, {
    timestamps: true
});

// create the Student collection/model
const Student = mongoose.model('Student', studentSchema);

// export the model
module.exports = Student;

