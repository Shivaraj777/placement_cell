
// create/add a new student by making an ajax request
$(document).ready(function(){
    let createStudentForm = $('#create-student-form'); //get the id of create student form

    // event handler for form submission
    createStudentForm.submit(function(e){
        e.preventDefault(); //prevent default behaviour of form

        // make an ajax request to server
        $.ajax({
            type: 'post',
            url: '/students/create-student',
            data: createStudentForm.serialize(), //converting the form data into a query string(json object) and sending it to the server
            success: function(data){
                console.log(data);
                let newStudent = newStudentDom(data.data.newStudent); //create a new student row
                $('#student-details>table').append(newStudent); //append the new student row to table
                new Noty({  //adding noty notification for sucessful student creation using ajax
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

// create a DOM for new student
let newStudentDom = function(student){
    return $(`<tr id="student-${student._id}">
        <td>${student.name}</td>
        <td>${student.college}</td>
        <td>${student.batch}</td>
        <td>${student.DSA_FinalScore}</td>
        <td>${student.WebD_FinalScore}</td>
        <td>${student.React_FinalScore}</td>
        <td>${student.status}</td>
    </tr>`);
}
