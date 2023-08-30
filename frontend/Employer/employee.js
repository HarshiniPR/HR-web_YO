const companyName="";
let companyEmail;
let noOfEmployees;
let name;
let phoneNo;
let jobTitle;
let industry;
let description;
let employementType;
let jobType;

document.getElementById("continuebtn").addEventListener("click",function(e){

    companyName = document.getElementById('companyName').value ;
    companyEmail = document.getElementById('companyEmail').value ;
    noOfEmployees = document.getElementById('numEmployees').value ;
    name = document.getElementById('accountCommunication').value ;
    phoneNo = document.getElementById('phoneNumber').value ;

})

document.getElementById("postjobbutton").addEventListener("click",function(e){
    industry = document.getElementById('companyIndustry').value ;
    jobTitle = document.getElementById('jobTitle').value ;
    description = document.getElementById('myTextArea').value ;
    employementType = document.getElementById('employementType').value ;
    jobType = document.getElementById('jobType').value ;

    const jobData={
        companyName,
        companyEmail,
        noOfEmployees,
        name,
        phoneNo,
        industry,
        jobTitle,
        description,
        employementType,
        jobType
    }

    console.log(jobData)
    fetch('http://localhost:4002/api/employer/jobs/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
    })
        .then(response => response.json())
        .then((data) => {
            if (data.success) {
                console.log(data)
                console.log("Authenticated")
                window.location.href = 'index.html';
            } else {
                if (data.message)
                    window.alert(data.message)
                if (data.errors)
                    window.alert(data.errors)
                console.log('Registration failed:', data);
            }
        })
        .catch(error => {
            console.error('ye Error h:', error);
        });
})