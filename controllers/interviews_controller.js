// Description: this file contains the actions related to interviews

const Interview = require('../models/interview'); //import the interview model

// action to render interviews page
module.exports.displayInterviews = function(req, res){
    return res.render('interviews', {
        title: 'Display Interviews page'
    });
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