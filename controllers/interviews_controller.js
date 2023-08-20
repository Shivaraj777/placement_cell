// Description: this file contains the actions related to interviews

// action to render interviews page
module.exports.displayInterviews = function(req, res){
    return res.render('interviews', {
        title: 'Display Interviews page'
    });
}