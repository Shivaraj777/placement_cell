class StudentsAssignedToInterview{

    // initialize the instance of the class using constructor
    constructor(interviewId, studentId){
        this.updateInterviewResultForm = $(`#update-interview-result-${interviewId}-${studentId}`);

        // call function to update interview result of a student
        this.updateStudentInterviewResult(); 
    }

    // update the interview result for a student
    updateStudentInterviewResult(){
        this.updateInterviewResultForm.submit((e) => {
            e.preventDefault();

            // make an ajax request to the server to update the result
            $.ajax({
                method: 'patch',
                url: '/interviews/update-interview-status',
                data: this.updateInterviewResultForm.serialize(),
                success: (data) => {
                    console.log(data);
                    let updatedStudentResult = this.updateStudentResultDom(data.data.result); //call function to update student result element
                    $(`#interview-result-${data.data.result.interviewId}-${data.data.result.studentId}`).replaceWith(updatedStudentResult); //update the student result for interview
                    new Noty({  //adding noty notification for sucessful result updation using ajax
                        theme: 'relax',
                        text: data.message,
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // updating the student result dom for an interview
    updateStudentResultDom(result){
        return $(`
            <td id="interview-result-${result.interviewId}-${result.studentId}">
                ${result.result}
            </td>
        `);
    }
}