const fetch = require('node-fetch'); //import node-fetch module
// const {jobsData} = require('../data'); //import the data module(test purpose)

// fetch the jobs from remotive API
module.exports.jobPage = async function (req, res) {
    try{
        const response = await fetch('https://remotive.com/api/remote-jobs');
        const jobsData = await response.json();
        // console.log(jobsData);

        return res.render('jobs', {
            title: "Placement Cell || Jobs List",
            jobs: jobsData.jobs
        });
    }catch(err){
        console.log(`Error: ${err}`);
        req.flash('error', err);
        return;
    }
};