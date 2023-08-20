const mongoose = require('mongoose'); //import the mongoose module

// create the interview schema
const interviewSchema = mongoose.Schema({
    company_name: {
        type: String,
        required: true
    },
    interview_date: {
        type: Date,
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    results: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Result'
    }]
}, {
    timestamps: true
});

// create the interview model
const Interview = mongoose.model('Interview', interviewSchema);

// export the model
module.exports = Interview;