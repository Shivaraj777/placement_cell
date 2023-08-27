
// display the students assigned to interview
let displayAssignedStudents = function(displayStudentsIcon, count){
    $(displayStudentsIcon).click(function(e){
        e.preventDefault();
        console.log('Clicked');
        let interviewId = $(this).attr('id');

        $(`#interview-assgn-${interviewId}`).toggleClass('display-none');
    });
}

//adding ajax functionality interviews
let convertInterviewsToAjax = function(){
    $('.interview-container').each(function(){
        let self = $(this);
        let displayStudentsIcon = $('.fa-angle-down', self);
        displayAssignedStudents(displayStudentsIcon);
    });
}

convertInterviewsToAjax();