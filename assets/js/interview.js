// const {formatDate} = require('../../utils/index');

// handle creating a interview
$(document).ready(function(){
    let createInterviewForm = $('#create-interview-form'); //get createinterview form element

    // event handler for create interview form submission
    createInterviewForm.submit(function(e){
        e.preventDefault();
        console.log("Create Interview");

        // make an Ajax request to the server
        $.ajax({
            method: 'POST',
            url: '/interviews/create-interview',
            data: createInterviewForm.serialize(),
            success: function(data){
                console.log(data);
                let newInterview = newInterviewDom(data.data.newInterview); //create new interview dom
                $('#interview-details-view').append(newInterview); //apend the new interview
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

    // event handler for assign students to interview form submission
    let assignInterviewForm = $('#assign-interview-form');

    assignInterviewForm.submit(function(e){
        e.preventDefault();

        // make an ajax request to the server
        $.ajax({
            method: 'put',
            url: '/interviews/assign-interview',
            data: assignInterviewForm.serialize(),
            success: function(data){
                console.log(data);
                let interviewStudentDetails = interviewStudentDetailsDom(data.data.student, data.data.interview, data.data.result);
                $(`#interview-assgn-${data.data.interview._id}>table`).append(interviewStudentDetails);

                // call the class to update the interview status for a student
                new StudentsAssignedToInterview();

                new Noty({  //adding noty notification for sucessful interview assignment using ajax
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

// create a new interview
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

// create the dom for students assigned to interview
let interviewStudentDetailsDom = function(student, interview, result){
    return $(`<tr>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${result.result}</td>
        <td>
            <form action="/interviews/update-interview-status" method="post">
                <select name="student_interview_result">
                    <option value="" disabled selected hidden>Update Status</option>
                    <option value="PASS">PASS</option>
                    <option value="FAIL">FAIL</option>
                    <option value="ON HOLD">ON HOLD</option>
                    <option value="DID NOT ATTEMPT">DID NOT ATTEMPT</option>
                </select><br>
                <input type="hidden" name="result" value="${result.id}">
                <button>Update</button>
            </form>
        </td>
    </tr>`);
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
        displayAssignedStudents(displayStudentsIcon); //call function to display the students assigned to interview

        $('.students-list>table>tbody>tr', self).each(function(){
            // get interviewId and studentId from students row
            let studentsRowId = $(this).attr('id');
            if(studentsRowId){
                let ids = studentsRowId.split('-');
                let interviewId = ids[1];
                let studentId = ids[2];
                new StudentsAssignedToInterview(interviewId, studentId); //instance to update student result
            }
        });
    });
}

convertInterviewsToAjax();

