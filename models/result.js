const mongoose = require('mongoose'); //require the mongoose module

// create the result schema
const resultSchema = mongoose.Schema({
    result: {
        type: String,
        enum: ['PASS', 'FAIL', 'ON HOLD', 'DID NOT ATTEMPT'],
        default: 'DID NOT ATTEMPT'
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    interviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interview'
    }
}, {
    timestamps: true
});

// create the Result model
const Result = mongoose.model('Result', resultSchema);

// export the model
module.exports = Result;
