let companyName;
let companyEmail;
let noOfEmployees;
let name;
let phoneNo;
let jobTitle;
let industry;
let description;
let employementType;
let jobType;

function Continuebtn(){

    companyName = document.getElementById('companyName').value ;
    companyEmail = document.getElementById('companyEmail').value ;
    noOfEmployees = document.getElementById('numEmployees').value ;
    name = document.getElementById('accountCommunication').value ;
    phoneNo = document.getElementById('phoneNumber').value ;

}

function postbtn(){
    industry = document.getElementById('companyIndustry').value ;
    description = document.getElementById('myTextArea').value ;
    const onsite = document.getElementById('color-red') ;
    if(onsite.checked){
        jobType = "on-site";
    }
    else{jobType="remote"}

    
    console.log(companyEmail)
    console.log(phoneNo)
    console.log(name)
}
// Select all elements with class "dropdown-toggle"
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

// Attach click event listeners to each dropdown toggle
dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
        e.preventDefault();
        const targetDropdownId = this.getAttribute("data-dropdown");
        const targetDropdown = document.querySelector(`.${targetDropdownId}`);
        
        // Toggle the "active" class to show/hide the dropdown content
        if (targetDropdown.classList.contains("active")) {
            targetDropdown.classList.remove("active");
        } else {
            // Hide any other open dropdowns
            document.querySelectorAll(".dropdown-content.active").forEach((activeDropdown) => {
                activeDropdown.classList.remove("active");
            });
            targetDropdown.classList.add("active");
        }
    });
});

// Close dropdowns when clicking outside
document.addEventListener("click", function (e) {
    if (!e.target.classList.contains("dropdown-toggle")) {
        document.querySelectorAll(".dropdown-content.active").forEach((activeDropdown) => {
            activeDropdown.classList.remove("active");
        });
    }
});


// document.getElementById("postjobbutton").addEventListener("click",function(e){

//     // const jobData={
//     //     companyName,
//     //     companyEmail,
//     //     noOfEmployees,
//     //     name,
//     //     phoneNo,
//     //     industry,
//     //     jobTitle,
//     //     description,
//     //     employementType,
//     //     jobType
//     // }

//     // console.log(jobData)
//     // fetch('http://localhost:4002/api/employer/jobs/new', {
//     //     method: 'POST',
//     //     headers: {
//     //         'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify(jobData),
//     // })
//     //     .then(response => response.json())
//     //     .then((data) => {
//     //         if (data.success) {
//     //             console.log(data)
//     //             console.log("Authenticated")
//     //             window.location.href = 'index.html';
//     //         } else {
//     //             if (data.message)
//     //                 window.alert(data.message)
//     //             if (data.errors)
//     //                 window.alert(data.errors)
//     //             console.log('Registration failed:', data);
//     //         }
//     //     })
//     //     .catch(error => {
//     //         console.error('ye Error h:', error);
//     //     });
// })