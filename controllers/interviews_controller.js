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
        req.flash('error', 'Company Name/Date cannot be blank');
        return res.redirect('back');
    }

    try{
        // check if interview already exists
        const interview = await Interview.findOne({company_name: req.body.company_name});

        // if interview does noot exist
        if(!interview){
            const newInterview = await Interview.create(req.body);

            // if the request is an ajax request
            if(req.xhr){
                // return the response in json format
                return res.status(200).json({
                    data: {
                        newInterview,
                    },
                    message: 'Interview created successfully'
                });
            }

            req.flash('success', 'Interview created successfully');
            return res.redirect('back');
        }else{
            // if the request is an ajax request
            if(req.xhr){
                console.log('Interview already exists');
                return res.status(500).json({
                    message: 'Interview already exists'
                });
            }

            req.flash('error', 'Interview already exists');
            return res.redirect('back');
        }
    }catch(err){
        console.log(`Error: ${err}`);
        req.flash('error', err);
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
            if(!interview.students.includes(student._id)){
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

                if(req.xhr){
                    return res.status(200).json({
                        data: {
                            student: student,
                            interview: interview,
                            result: result
                        },
                        message: 'Student assigned to interview'
                    });
                }

                req.flash('success', 'Student assigned to Interview');
            }else{
                // if request is an ajax request
                if(req.xhr){
                    return res.status(500).json({
                        message: 'Student already assigned to company interview'
                    });
                }
                req.flash('error', 'Student already assigned to company interview');
                res.redirect('back');
            }
        }

        return res.redirect('back');
    }catch(err){
        console.log(`Error: ${err}`);
        req.flash('error', err);
        return;
    }
}

// action to update interview status for a student
module.exports.updateInterviewStatus = async function(req, res){
    try{
        // find the result to be updated
        const result = await Result.findByIdAndUpdate(req.body.result, {$set: {result: req.body.student_interview_result}}, {new: true});
        console.log('*****Student interview status updated*****');

        // if interview result is passed set student placement status to placed
        if(result && result.result === 'PASS'){
            await Student.findByIdAndUpdate(result.studentId, {$set: {status: 'Placed'}});
            console.log('*****Student placement status updated*****');
        }

        if(req.xhr){
            return res.status(200).json({
                data: {
                    result
                },
                message: 'Successfully updated student interview result'
            });
        }

        req.flash('success', 'Successfully updated Student Interview result');
        res.redirect('back');
    }catch(err){
        console.log(`Error: ${err}`);
        req.flash('error', err);
        return;
    }
}