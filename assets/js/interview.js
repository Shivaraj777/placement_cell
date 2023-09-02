// const {formatDate} = require('../../utils/index');

// handle creating a interview
$(document).ready(function(){
    let createInterviewForm = $('#create-interview-form'); //get createinterview form element

    // event handler for form submission
    $(createInterviewForm).submit(function(e){
        e.preventDefault();
        console.log("Create Interview");

        // make an Ajax request to the server
        $.ajax({
            method: 'POST',
            url: '/interviews/create-interview',
            data: createInterviewForm.serialize(),
            success: function(data){
                console.log(data);
                let newInterview = newInterviewDom(data.data.newInterview);
                $('#interview-details-view').append(newInterview);
                let updatedSelectCompanyDropdown = updatedSelectCompanyDropdownDom(data.data.newInterview);
                $('#select-company').append(updatedSelectCompanyDropdown);
                displayAssignedStudents($('.fa-angle-down', newInterview));

                new Noty({  //adding noty notification for sucessful interview creation using ajax
                    theme: 'relax',
                    text: data.message,
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                }).show();
            },
            error: function(error){
                console.log(error.responseText);
                new Noty({  //adding noty notification for error
                    theme: 'relax',
                    text: error.responseJSON.message,
                    type: 'error',
                    layout: 'topRight',
                    timeout: 1500
                }).show();
            }
        });
    });
});

let newInterviewDom = function(interview){
    return $(`<div class="interview-container">
        <div class="interview-details">
            <span>${interview.company_name}</span>
            <span>${interview.interview_date}</span>
            <i id="${interview._id}" class="fa-solid fa-angle-down"></i>
        </div>
        <div class="students-list display-none" id="interview-assgn-${interview._id}">
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Result Status</th>
                    <th>Update Result Status</th>
                </tr>
            </table>
        </div>
    </div>`);
}

// update the the select company dropdown DOM to get new interview details
let updatedSelectCompanyDropdownDom = function(interview){
    return $(`<option value="${interview.company_name}">${interview.company_name}</option>`)
}


// display the students assigned to interview
let displayAssignedStudents = function(displayStudentsIcon){
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

