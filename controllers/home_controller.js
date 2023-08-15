// home action
module.exports.home = function(req, res){
    // return res.end('<h1>Placement cell is up and running</h1>');
    return res.render('home', {
        title: 'Home page'
    });
}