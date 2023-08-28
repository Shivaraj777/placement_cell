// Description: This file contains all the action related to students

const objectsToCsv = require('objects-to-csv'); //import the objects-to-csv module
const fs = require('fs'); //import file system module
const Student = require('../models/student'); //import the student model
const Interview = require('../models/interview'); //import the interview model
const Result = require('../models/result'); //import the result model

// render students page
module.exports.displayStudents = async function(req, res){
    try{
        // fetch all the students from database
        const students = await Student.find({});

        // render the page
        return res.render('students', {
            title: 'Student Details page',
            students: students
        });
    }catch(err){
        console.log(`Error: ${err}`);
    }
}

// action to create a student
module.exports.createStudent = async function(req, res){
    // don't create student if name and email is empty
    if(req.body.name === '' || req.body.email === ''){
        req.flash('error', 'Name/Email should not be blank');
        return res.redirect('back');
    }

    try{
        // check if the student already exists
        let student = await Student.findOne({email: req.body.email});

        // if student does not exist, create student
        if(!student){
            await Student.create(req.body);
            req.flash('success', 'Student added successfully');
            return res.redirect('back');
        }else{
            req.flash('error', 'Student already exists');
            return res.redirect('back');
        }
    }catch(err){
        console.log(`Error: ${err}`);
        req.flash('error', err);
        return res.redirect('back');
    }
}

// action to download student data
module.exports.downloadStudentData = async function (req, res) {
    try{
        // fetch the data
        const studentList = await Student.find({});
        const dataPresent = [];

        for (let i = 0; i < studentList.length; i++) {
            const student = studentList[i];
            for (let j = 0; j < student.interviews.length; j++) {
                const id = student.interviews[j];
                const interviewData = await Interview.findById(id);
                //find result
                var result = "On Hold";
                const resultData = await Result.find({ studentId: student.id });
                for (let k = 0; k < resultData.length; k++) {
                    if (resultData[k].interviewId == interviewData.id) {
                        result = resultData[k].result;
                        break;
                    }
                }

                // add the data to list
                const list = {
                    StudentId: student.id,
                    Name: student.name,
                    Email: student.email,
                    Batch: student.batch,
                    College: student.college,
                    Placement_Status: student.status,
                    DSA_Final_Score: student.DSA_FinalScore,
                    WEB_Dev_Final_Score: student.WebD_FinalScore,
                    REACT_Final_Score: student.React_FinalScore,
                    Company_Name: interviewData.company_name,
                    Interview_Date: interviewData.interview_date.toString().substring(4, 15),
                    Interview_Result: result
                };
                dataPresent.push(list);
            }
        }

        // convert to csv
        const csv = new objectsToCsv(dataPresent);
        await csv.toDisk('./studentData.csv');
        return res.download('./studentData.csv', () => {
            //for deleting file
            fs.unlinkSync('./studentData.csv');
        });
    }catch(err){
        console.log(`Error: ${err}`);
        req.flash('error', 'Error in downloading file');
        return;
    }
}