class StudentsAssignedToInterview{
    constructor(interviewId, studentId){
        this.updateInterviewResultForm = $(`#update-interview-result-${interviewId}-${studentId}`);

        this.updateStudentInterviewResult();
    }

    // update the interview result for a student
    updateStudentInterviewResult(){
        this.updateInterviewResultForm.submit((e) => {
            e.preventDefault();

            $.ajax({
                method: 'patch',
                url: '/interviews/update-interview-status',
                data: this.updateInterviewResultForm.serialize(),
                success: (data) => {
                    console.log(data);
                    let updatedStudentResult = this.updateStudentResultDom(data.data.result);
                    $(`#interview-result-${data.data.result.interviewId}-${data.data.result.studentId}`).replaceWith(updatedStudentResult);
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

    updateStudentResultDom(result){
        return $(`
            <td id="interview-result-${result.interviewId}-${result.studentId}">
                ${result.result}
            </td>
        `);
    }
}