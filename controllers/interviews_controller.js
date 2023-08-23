// Description: this file contains the actions related to interviews

const Interview = require('../models/interview'); //import the interview model
const { formatDate } = require('../utils');

// action to render interviews page
module.exports.displayInterviews = async function(req, res){
    try{
        // fetch the interviews
        const interviews = await Interview.find({});

        return res.render('interviews', {
            title: 'Display Interviews page',
            interviews: interviews,
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