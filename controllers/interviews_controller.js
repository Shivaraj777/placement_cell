// Description: this file contains the actions related to interviews

const Interview = require('../models/interview'); //import the interview model
const Student = require('../models/student'); //import the student model
const Result = require('../models/result'); //import the result model
const { formatDate } = require('../utils');

// action to render interviews page
module.exports.displayInterviews = async function(req, res){
    try{
        // fetch the interviews
        const interviews = await Interview.find({}).populate('students').populate('results').exec();
        const students = await Student.find({});

        return res.render('interviews', {
            title: 'Display Interviews page',
            interviews: interviews,
            students: students,
            formatDate: formatDate
        });
    }catch(err){
        console.log(`Error: ${err}`);
        return res.redirect('back');
    }
}

// action to create interview
module.exports.createInterview = async  function(req, res){
    if(req.body.comapny_name === '' || req.body.interview_date === ''){
        return res.redirect('back');
    }

    try{
        // check if interview already exists
        const interview = await Interview.findOne({company_name: req.body.company_name});

        // if interview does noot exist
        if(!interview){
            await Interview.create(req.body);
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log(`Error: ${err}`);
        return res.redirect('back');
    }
}

// action to assign a student to an interview
module.exports.assignInterview = async function(req, res){
    try{
        // fetch the student and company name
        console.log("*****Creating student and interview*****");
        const student = await Student.findOne({email: req.body.student_email});
        const interview = await Interview.findOne({company_name: req.body.company_name});

        // if student and interview exist in database
        if(student && interview){
            // create a result for student interview
            console.log("*****Creating result*****");
            const result = await Result.create({
                studentId: student._id,
                interviewId: interview._id
            });

            // add the student and result to interview
            console.log("*****Updating*****");
            interview.students.push(student._id);
            interview.results.push(result._id);
            interview.save();

            // add the interview details to student records
            student.interviews.push(interview._id);
            student.save();

            return res.redirect('back');
        }
    }catch(err){
        console.log(`Error: ${err}`);
        return;
    }
}